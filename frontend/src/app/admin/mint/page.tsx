'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'

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
    } catch (err: any) {
      console.error(err)
      setStatus(err.response?.data?.error || 'Minting failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mint Achievement NFT</h1>

      {address ? (
        <p className="text-sm text-gray-600 mb-2">
          <strong>Connected Admin Wallet:</strong> {address}
        </p>
      ) : (
        <p className="text-red-600 mb-2">Please connect your wallet to mint.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-4 rounded-xl">
        <input
          type="text"
          name="studentWallet"
          placeholder="Student Wallet Address"
          value={form.studentWallet}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="activityName"
          placeholder="Activity Name (e.g. Chess Club)"
          value={form.activityName}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="activityType"
          value={form.activityType}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Activity Type</option>
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
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={!address || loading}
          className={`w-full px-4 py-2 rounded ${
            address
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-center ${
            status.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  )
}

export default AdminMintNFT
