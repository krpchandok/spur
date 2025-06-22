import { Request, Response } from 'express'
import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
import contractJson from '../artifacts/contracts/educationNFT.sol/EducationNFT.json'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import Configuration from 'openai'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'


dotenv.config()
const upload = multer()


const API_URL = process.env.API_URL!
const PRIVATE_KEY = process.env.PRIVATE_KEY!
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY

const provider = new ethers.JsonRpcProvider(API_URL)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, signer)

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export const registerUser = async (req: Request, res: Response) => {
  const { wallet, name, role } = req.body
  console.log('Received /register:', { wallet, name, role })

  if (!wallet || !name || !role) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { error } = await supabase.from('users').insert([{ wallet, name, role }])
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}

export const mintAchievement = async (req: Request, res: Response) => {
  const { studentWallet, activityName, activityType, description } = req.body;
  const file = req.file;

  if (!studentWallet || !activityName || !activityType || !description || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const imageData = new FormData()
    imageData.append('file', file.buffer, file.originalname)

    const imageRes = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      imageData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...imageData.getHeaders(),
          pinata_api_key: PINATA_API_KEY!,
          pinata_secret_api_key: PINATA_SECRET_API_KEY!,
        },
      }
    )

    const imageCID = imageRes.data.IpfsHash;
    const imageURI = `ipfs://${imageCID}`;

    // Build metadata
    const metadata = {
      name: activityName,
      description,
      image: imageURI,
      attributes: [{ trait_type: 'Type', value: activityType }],
    };

    const metadataRes = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY!,
          pinata_secret_api_key: PINATA_SECRET_API_KEY!,
        },
      }
    );

    const metadataCID = metadataRes.data.IpfsHash;
    const tokenURI = `ipfs://${metadataCID}`;

    const tx = await contract.connect(signer).mintAchievement(
      studentWallet,
      activityName,
      activityType,
      tokenURI
    );

    await tx.wait();

    return res.status(201).json({ txHash: tx.hash, tokenURI });
  } catch (err: any) {
    console.error('Minting error:', err);
    return res.status(500).json({ error: 'Minting failed' });
  }
};


export const getStudentAchievements = async (req: Request, res: Response) => {
  const { wallet } = req.params;
  console.log("GET /achievements/:wallet called with:", wallet);

  try {
    if (!ethers.isAddress(wallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const rawAchievements = await contract.getStudentAchievements(wallet);
    console.log("Raw achievements from contract:", rawAchievements);

    const achievements = rawAchievements.map((a: any) => ({
      activityName: a.activityName,
      activityType: a.activityType,
      timestamp: a.timestamp.toString(),
      issuedBy: a.issuedBy,
    }));

    return res.status(200).json({ achievements });
  } catch (err: any) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: err.reason || err.message || 'Failed to fetch achievements' });
  }
};



import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY!,
})

export const generateProfile = async (req: Request, res: Response) => {
  const { wallet } = req.params

  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required' })
  }

  // Fallback for testing
  if (process.env.DEV_MODE === 'true') {
    return res.json({
      summary:
        "This student shows analytical thinking and strategic depth through their involvement in Chess Club. Their extracurricular activity suggests strong focus, patience, and a drive for continual improvement.",
    })
  }

  // Check API key explicitly (defensive)
  if (!process.env.OPENAI_SECRET_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' })
  }

  try {
    // 1. Fetch student's achievements from contract
    const rawAchievements = await contract.getStudentAchievements(wallet)

    const achievements = rawAchievements.map((a: any) => ({
      activityName: a.activityName,
      activityType: a.activityType,
    }))

    if (achievements.length === 0) {
      return res.status(404).json({ error: 'No achievements found for this wallet' })
    }

    // 2. Build prompt
    const prompt = `
You are an AI career advisor. Here's a student's list of extracurriculars:

${achievements.map(a => `- ${a.activityName} (${a.activityType})`).join('\n')}

Write a brief recruiter-facing profile summary that highlights:
1. Key interests or specializations
2. Diversity of involvement
3. Personality traits inferred
4. Growth potential

Make it sound impressive but honest. Avoid listing dates or exact activities again.
    `.trim()

    // 3. Call OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    const summary = response.choices?.[0]?.message?.content?.trim()

    if (!summary) {
      console.error('OpenAI returned no summary:', response)
      return res.status(500).json({ error: 'No summary generated' })
    }

    return res.status(200).json({ summary })
  } catch (err: any) {
    console.error('AI profile generation failed:', err?.response?.data || err.message || err)
    return res.status(500).json({ error: 'AI profile generation failed' })
  }
}


export const getUserRole = async (req: Request, res: Response) => {
  const { wallet } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('wallet', wallet)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ role: data.role });
  } catch (err: any) {
    console.error('Role fetch error:', err);
    return res.status(500).json({ error: err.message || 'Error fetching role' });
  }
};

export const getUserName = async (req: Request, res: Response) => {
  const { wallet } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('wallet', wallet)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ role: data.name });
  } catch (err: any) {
    console.error('Role fetch error:', err);
    return res.status(500).json({ error: err.message || 'Error fetching name' });
  }
};

