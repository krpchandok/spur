'use client'

import Nav from "../components/Nav"
import Link from "next/link"

function AdminDashboard() {
  return (<>
    <Nav />
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 gap-8 py-8">

      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-5xl px-4">
        <h1 className="text-5xl font-light text-white tracking-wider">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col text-center items-center gap-5 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-light text-white tracking-wide">Minting</h2>
            <p className="text-white/70 font-light max-w-xs">
              Go to the minting page to create and issue new achievement NFTs to students.
            </p>
            <Link href="/admin/mint/" className="w-full mt-auto">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-md">
                Go to Minting
              </button>
            </Link>
          </div>

          {/* Search Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col text-center items-center gap-5 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-light text-white tracking-wide">Search</h2>
            <p className="text-white/70 font-light max-w-xs">
              Go to the search page to find students and view their collected achievements.
            </p>
            <Link href="/admin/search/" className="w-full mt-auto">
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl text-md">
                Go to Search
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard