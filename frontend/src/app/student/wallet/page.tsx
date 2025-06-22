'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'
import Token from '../../Components/Token'
import Folder from '../../Components/Folder'
import Nav from '../../Components/Nav'
export default function StudentWalletPage() {
  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()
  const [achievements, setAchievements] = useState<any[]>(["test", "test", "test1", "test2", "test3", "test4", "test5"])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])

  //if (!wallet) return <p>Wallet not connected.</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="flex min-h-screen bg-[#221C3E] text-gray-300">
      <div className="flex flex-col flex-1">
       <Nav/>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold mb-4 text-white">My Tokens</h2>
              <div className="bg-[#2E2550] p-6 rounded-lg shadow-2xl">
                <div className="space-y-4">
                  <Folder />
                  <Folder />
                  <Folder />
                </div>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8">
                  {achievements.map((a, i) => (
                    <Token key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
