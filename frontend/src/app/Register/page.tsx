'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [role, setRole] = useState('Student')

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Register
        </h1>

        <form className="flex flex-col gap-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Student">Student</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition text-white text-sm font-medium py-3 rounded-lg"
          >
            Register with Wallet
          </button>
        </form>
      </div>
    </div>
  )
}
