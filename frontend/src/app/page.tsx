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

  useEffect(() => {
    const checkRole = async () => {
      if (!isConnected || !address) return

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
  }, [isConnected, address])

  const router = useRouter()

  const loginPage = () => {
    router.push("/Login")
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p>Please connect your wallet to continue.</p>
      <ConnectButton />
      {checking && <p className="mt-4 text-sm text-gray-500">Checking your role...</p>}
    </div>
  )
}
