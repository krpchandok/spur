'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [role, setRole] = useState('Student')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
        <h1 className="h-18 text-6xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
          Register
        </h1>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none placeholder-white/50 transition duration-300"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none placeholder-white/50 transition duration-300 appearance-none"
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-3 rounded-2xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            <span>Register with Wallet</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
