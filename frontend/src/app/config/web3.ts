import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Education NFT App',
  projectId: '7dccf20ccdd6dbf6fb0f6950e86053dd', 
  chains: [hardhat, sepolia, polygon],
  ssr: true,
});

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "teacher",
        "type": "address"
      }
    ],
    "name": "authorizeTeacher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "activityName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "activityType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "schoolName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintAchievement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "getStudentTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getAchievement",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "activityName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "activityType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "schoolName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "issuedBy",
            "type": "address"
          }
        ],
        "internalType": "struct EducationNFT.Achievement",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];