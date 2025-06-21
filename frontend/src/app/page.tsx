'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config/web3";
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  // Read student tokens
  const { data, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getStudentTokens',
    args: [address || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
  });

  const mintTestNFT = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintAchievement',
        args: [
          address, // student
          'Math Excellence', // activityName
          'Academic', // activityType
          'Test School', // schoolName
          'https://example.com/metadata.json' // tokenURI
        ],
      });
    } catch (err) {
      console.error('Mint error:', err);
    }
  };

  console.log('Connected address:', address);
  console.log('Contract data:', data);
  console.log('Contract error:', error);

  const router = useRouter()

  const loginPage = () => {
    router.push("/Login")
  }

  return (
    <div className="p-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={()=>loginPage()} >Login page Test</button>
      <h1 className="text-2xl font-bold mb-4">Education NFT Test</h1>
      
      <div className="space-y-4">
        {/* RainbowKit Connect Button */}
        <ConnectButton />
        
        <div>
          <p><strong>Connected:</strong> {address || 'Not connected'}</p>
          <p><strong>Network:</strong> {isConnected ? 'Connected' : 'Disconnected'}</p>
          <p><strong>Tokens:</strong> {data ? `[${data.join(', ')}]` : 'Loading...'}</p>
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>

        <button 
          onClick={mintTestNFT}
          disabled={!isConnected}
          className={`px-4 py-2 rounded ${
            isConnected 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Mint Test NFT
        </button>
      </div>
    </div>
  );
}