'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'
import TopNav from '@/app/components/topbar'
import Token from '@/app/components/Token'
import Folder from '@/app/components/Folder'

const TOKEN_CATEGORIES = ["Sports", "Tech", "Hackathon", "Club"]

export default function StudentWalletPage() {
  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()

  const [achievements, setAchievements] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])


  useEffect(() => {
    const fetchAchievements = async () => {
      if (!wallet) return
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${wallet}`)
        setAchievements(res.data.achievements)
      } catch (err) {
        console.error('Failed to fetch achievements', err)
        setError('Could not load achievements')
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [wallet])

  if (error) return <p className="text-red-500 p-4">{error}</p>

  const grouped = TOKEN_CATEGORIES.map(category => ({
    type: category,
    tokens: achievements.filter(a => a.activityType === category),
  }))

  return (
    <div className="flex min-h-screen bg-[#221C3E] text-gray-300">
      <div className="flex flex-col flex-1">
        <TopNav />

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl">
            <div className="lg:col-span-7">
              <div className="mb-6">
                {loading ? (
                  <p className="text-white text-xl">Loading...</p>
                ) : (
                  <h1 className="text-3xl font-bold text-white mb-1">
                    Welcome{ name ? `, ${name}` : '' }!
                  </h1>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-4 text-white">Your Tokens</h2>

              <div className="bg-[#2E2550] p-6 rounded-lg shadow-2xl space-y-8">
                {grouped.map(group => (
                  <Folder key={group.type} title={group.type}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {group.tokens.map((a, i) => (
                        <Token
                          key={`${group.type}-${i}`}
                          activityName={a.activityName}
                          activityType={a.activityType}
                        />
                      ))}
                    </div>
                  </Folder>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
