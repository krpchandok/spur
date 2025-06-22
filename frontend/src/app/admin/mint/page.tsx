'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'
import Link from 'next/link'

const AdminMintNFT: React.FC = () => {
  const [form, setForm] = useState({
    studentWallet: '',
    activityName: '',
    activityType: '',
    tokenURI: '',
  })

  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Automatically connect wallet if disconnected
  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      if (!address) {
        setStatus('Wallet not connected.')
        return
      }

      const payload = {
        adminWallet: address,
        ...form,
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mint`,
        payload
      )

      setStatus(res.data.message || 'Minted successfully!')
      // Reset form on success
      setForm({
        studentWallet: '',
        activityName: '',
        activityType: '',
        tokenURI: '',
      })
    } catch (err: any) {
      console.error(err)
      setStatus(err.response?.data?.error || 'Minting failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#221C3E] text-gray-300">
      <div className="w-full">
        <header className="w-full flex justify-between items-center p-4 sm:p-6 bg-[#2E2550] border-b border-white/10">
            <h1 className="text-2xl sm:text-3xl font-thin text-white">LEGITAMINT</h1>
            <Link href="/admin/" className="bg-[#6D28D9] text-white px-4 py-2 sm:px-6 rounded-lg font-semibold hover:bg-[#5B21B6] transition">
            Back
            </Link>
        </header>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#2E2550] p-6 sm:p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Mint Achievement NFT
          </h2>
          {address ? (
            <p className="text-sm text-purple-300 mb-6 text-center">
              Minting as: <strong className="text-white break-all">{address}</strong>
            </p>
          ) : (
            <p className="text-red-400 mb-6 text-center">
              Please connect your admin wallet to mint an NFT.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="studentWallet"
                placeholder="Student Wallet Address"
                value={form.studentWallet}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition"
              />
              <input
                type="text"
                name="activityName"
                placeholder="Activity Name (e.g. Chess Club)"
                value={form.activityName}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition"
              />
            </div>
            <select
              name="activityType"
              value={form.activityType}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="" disabled>Select Activity Type</option>
              <option value="Club">Club</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Sports">Sports</option>
              <option value="Volunteer">Volunteer</option>
            </select>
            <input
              type="text"
              name="tokenURI"
              placeholder="Token Metadata URI (e.g. IPFS link)"
              value={form.tokenURI}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={!address || loading}
              className="w-full px-4 py-3 rounded-lg text-base font-semibold transition-all disabled:bg-gray-500/40 disabled:cursor-not-allowed bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
            >
              {loading ? 'Minting...' : 'Mint NFT'}
            </button>
          </form>

          {status && (
            <div className="mt-6 text-center">
              <p
                className={`px-4 py-2 rounded-lg inline-block ${
                  status.toLowerCase().includes('success')
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {status}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminMintNFT
