'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'
import TopNav from '@/app/components/topbar'

const AdminMintNFT: React.FC = () => {
  const [form, setForm] = useState({
    studentWallet: '',
    activityName: '',
    activityType: '',
    description: '',
  })

  const [image, setImage] = useState<File | null>(null)

  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
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

      const formData = new FormData()
      formData.append('adminWallet', address)
      formData.append('studentWallet', form.studentWallet)
      formData.append('activityName', form.activityName)
      formData.append('activityType', form.activityType)
      formData.append('description', form.description)
      if (image) {
        formData.append('image', image)
      } else {
        setStatus('Please upload an image.')
        return
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mint`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setStatus(res.data.message || 'Minted successfully!')
      setForm({
        studentWallet: '',
        activityName: '',
        activityType: '',
        description: '',
      })
      setImage(null)
    } catch (err: any) {
      console.error(err)
      setStatus(err.response?.data?.error || 'Minting failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#221C3E] text-gray-300">
      <TopNav/>

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

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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

            <textarea
              name="description"
              placeholder="Short description for the NFT"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full h-24 rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition resize-none"
            />

            <select
              name="activityType"
              value={form.activityType}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition appearance-none"
            >
              <option value="" disabled>Select Activity Type</option>
              <option value="Club">Club</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Sports">Sports</option>
              <option value="Volunteer">Volunteer</option>
            </select>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white"
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
