'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'

export default function StudentWalletPage() {
  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()
  const [achievements, setAchievements] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  // fallback in case wallet context is empty (e.g. page refresh)
  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!wallet) return

      return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${wallet}`).then((res) => {
          setAchievements(res.data.achievements)
        }).catch((err: any) => {
        console.error('Fetch error:', err)
        setError('Failed to fetch achievements')
      })
    }

    fetchAchievements()
  }, [wallet])

  if (!wallet) return <p>Wallet not connected.</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h2>Your Achievements</h2>
      {achievements.length === 0 ? (
        <p>No achievements found.</p>
      ) : (
        achievements.map((a, i) => (
          <div key={i}>
            <h3>{a.activityName}</h3>
            <p>{a.activityType} | Issued by: {a.issuedBy}</p>
          </div>
        ))
      )}
    </div>
  )
}
