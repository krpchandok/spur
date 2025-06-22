'use client'

import { useAccount } from 'wagmi'
import { useWalletContext } from './providers/WalletProvider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import axios from 'axios'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { setWallet } = useWalletContext()
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [readyToCheck, setReadyToCheck] = useState(false)

  useEffect(() => {
    const checkRole = async () => {
      if (!isConnected || !address || !readyToCheck) return

      setWallet(address)
      setChecking(true)

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-role/${address}`)
        const role = res.data.role

        if (role === 'admin') router.push('/admin/mint')
        else if (role === 'student') router.push('/student/wallet')
        else console.warn('Unknown role:', role)
      } catch (err) {
        console.error('Failed to fetch role:', err)
      } finally {
        setChecking(false)
      }
    }

    checkRole()
  }, [isConnected, address, readyToCheck])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#293f7b] px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 w-full max-w-xl text-center border border-gray-200">
        {/* Logo or Company Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-20 tracking-tight font-sans">
            LEGITIMINT
        </h1>


        {!isConnected && <p className="text-lg text-gray-600 mb-8">
          Connect your wallet to access your personalized dashboard.
        </p>}

        {/* Wallet Connect */}
        <div className="flex justify-center mb-6">
          <ConnectButton />
        </div>

        {/* Continue button */}
        {isConnected && (
          <button
            onClick={() => setReadyToCheck(true)}
            className="mt-4 w-full sm:w-auto px-8 py-3 bg-indigo-700 text-white font-medium text-base rounded-xl hover:bg-indigo-900 transition shadow-md"
          >
            CONTINUE
          </button>
        )}

        {/* Role checking loader */}
        {checking && (
          <p className="mt-4 text-sm text-gray-500">🔍 Verifying your role...</p>
        )}
      </div>
    </main>
  )
}
