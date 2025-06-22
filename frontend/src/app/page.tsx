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

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      setWallet(address)
    }
  }, [isConnected, address])

  const handleLogin = async () => {
    if (!address) return

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-role/${address}`)
      const role = res.data.role

      if (role === 'admin') router.push('/admin')
      else if (role === 'student') router.push('/student/wallet')
      else setStatus('Unknown role.')
    } catch (err: any) {
      setStatus('Login failed: ' + (err.response?.data?.error || 'not registered'))
    }
  }

  const handleRegister = async () => {
    if (!name || !role || !address) {
      setStatus('Please fill in all fields.')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        wallet: address,
        name,
        role,
      })

      if (role === 'admin') router.push('/admin')
      else router.push('/student/wallet')
    } catch (err: any) {
      setStatus(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#293f7b] px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 w-full max-w-xl text-center border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 tracking-tight font-sans">
          LEGITIMINT
        </h1>

        <div className="flex justify-center mb-6">
          <ConnectButton />
        </div>

        {!isConnected && (
          <p className="text-lg text-gray-600">
            Connect your wallet to continue.
          </p>
        )}

        {isConnected && (
          <>
            {/* LOGIN SECTION */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Already registered?</h2>
              <button
                onClick={handleLogin}
                className="w-full px-6 py-3 rounded-xl bg-indigo-700 text-black font-semibold hover:bg-indigo-900 transition"
              >
                Login
              </button>
            </div>

            {/* REGISTER SECTION */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">New here? Register below:</h2>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-black"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full px-4 py-3 bg-indigo-700 text-black font-medium text-base rounded-xl hover:bg-indigo-900 transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register & Continue'}
              </button>
            </div>
          </>
        )}

        {/* STATUS */}
        {status && (
          <p className="mt-6 text-sm text-red-500">{status}</p>
        )}
      </div>
    </main>
  )
}
