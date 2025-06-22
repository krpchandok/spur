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
  }, [isConnected, address, setWallet])

  const handleLogin = async () => {
    if (!address) return;
    setLoading(true);
    setStatus('');

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-role/${address}`)
      const role = res.data.role

      if (role === 'admin') router.push('/admin')
      else if (role === 'student') router.push('/student/wallet')
      else setStatus('Unknown role.')
    } catch (err: any) {
      setStatus('Login failed: ' + (err.response?.data?.error || 'not registered'))
    } finally {
        setLoading(false);
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
        <h1 className="text-5xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
          LEGITIMINT
        </h1>

        <div className="flex justify-center mb-8">
          <ConnectButton />
        </div>

        {!isConnected && (
          <p className="text-lg text-white/70">
            Connect your wallet to continue.
          </p>
        )}

        {isConnected && (
          <div className="space-y-8">
            {/* LOGIN SECTION */}
            <div>
              <h2 className="text-xl font-light text-white/80 mb-4">Already registered?</h2>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center px-8 py-3 rounded-2xl font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
                {!loading && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                )}
              </button>
            </div>

            {/* REGISTER SECTION */}
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-light text-white/80 mb-4">New here? Register below:</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none placeholder-white/50 transition duration-300"
                />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none placeholder-white/50 transition duration-300 appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-8 py-3 rounded-2xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                >
                  <span>{loading ? 'Registering...' : 'Register & Continue'}</span>
                  {!loading && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATUS */}
        {status && (
          <p className="mt-6 text-sm text-pink-400/80">{status}</p>
        )}
      </div>
    </main>
  )
}
