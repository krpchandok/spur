'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../providers/WalletProvider'

export default function ProfilePage() {
  const { wallet } = useWalletContext()
  const [achievements, setAchievements] = useState<any[]>([])
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!wallet) return
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${wallet}`)
        setAchievements(res.data.achievements)
      } catch (err) {
        console.error('Failed to fetch achievements', err)
        setError('Could not load achievements')
      }
    }

    fetchAchievements()
  }, [wallet])

  // AI Summary generator
  const generateSummary = async () => {
    if (!wallet) return
    setLoading(true)
    setSummary('')
    setError('')

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-profile/${wallet}`)
      setSummary(res.data.summary)
    } catch (err) {
      console.error('Failed to generate summary', err)
      setError('Something went wrong while generating your summary.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">🎓 Your Profile</h1>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Achievements</h2>

        {achievements.length === 0 ? (
          <p className="text-gray-500">No achievements found for this wallet.</p>
        ) : (
          <ul className="space-y-4">
            {achievements.map((a, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow border">
                <div className="font-semibold text-lg text-gray-800">{a.activityName}</div>
                <div className="text-sm text-gray-600">
                  {a.activityType} • Issued by {a.issuedBy.slice(0, 6)}...
                  <span className="ml-2">
                    {new Date(Number(a.timestamp) * 1000).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* AI Button */}
      <button
        onClick={generateSummary}
        disabled={loading || !wallet}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Generating Summary...' : '🧠 Generate AI Summary'}
      </button>

      {/* Error or Summary */}
      <div className="mt-8">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {summary && (
          <div className="bg-white p-6 rounded-lg shadow mt-4 border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">AI Summary</h3>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
