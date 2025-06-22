'use client'

import { useAccount, useChainId, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'

export default function TopNav() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const [showSettings, setShowSettings] = useState(false)

  const chainName = {
    1: 'Ethereum',
    5: 'Goerli',
    137: 'Polygon',
    80001: 'Mumbai',
  }[chainId] || 'Unknown'

  const handleLogout = () => {
    disconnect()
    router.push('/')
  }

  const goToProfile = () => {
    router.push('/profile')
  }

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">NFT Dashboard</h2>

      {isConnected && (
        <div className="flex items-center gap-4">
          <button
            onClick={goToProfile}
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            View Profile
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="hover:text-blue-600 text-gray-500"
            title="Settings"
          >
            <FiSettings size={20} />
          </button>

          <button
            onClick={handleLogout}
            className="hover:text-red-600 text-gray-500"
            title="Disconnect"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      )}
    </header>
  )
}
