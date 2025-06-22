'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../providers/WalletProvider'
import Nav from '@/app/Components/Nav'
import Token from '@/app/Components/Token'
import Folder from '@/app/Components/Folder'

const TOKEN_CATEGORIES = ["Sports", "Tech", "Hackathon", "Club"]

export default function ProfilePage() {
  const { wallet } = useWalletContext()
  const [achievements, setAchievements] = useState<any[]>([])
  const [summary, setSummary] = useState('')
  const [name, setName] = useState<string | null>(null)
  const [isSummaryLoading, setSummaryLoading] = useState(false)
  const [isPageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')



  const generateSummary = async () => {
    if (!wallet) return
    setSummaryLoading(true)
    setSummary('')
    setError('')

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-profile/${wallet}`)
      setSummary(res.data.summary)
    } catch (err) {
      console.error('Failed to generate summary', err)
      setError('Something went wrong while generating your summary.')
    } finally {
      setSummaryLoading(false)
    }
  }

  if (error && !isPageLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <p className="text-pink-400/80 text-lg">{error}</p>
        </div>
      )
  }

  const grouped = TOKEN_CATEGORIES.map(category => ({
    type: category,
    tokens: achievements.filter(a => a.activityType === category),
  }))

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Nav />
      <main className="flex-1 p-4 sm:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-light tracking-wider mb-2">
              Your Profile
            </h1>
            <p className="text-lg text-white/70">View your achievements and generate an AI-powered summary.</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-light text-white/90 mb-4">AI Summary Generator</h2>
              <p className="text-white/60 mb-6">
                Click the button to generate a shareable, AI-powered summary of all your verified achievements.
              </p>
              <button
                onClick={generateSummary}
                disabled={isSummaryLoading || !wallet}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-2xl font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                <span>{isSummaryLoading ? 'Generating...' : 'Generate AI Summary'}</span>
                {!isSummaryLoading && (
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                )}
              </button>

              {summary && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-white/90 whitespace-pre-line leading-relaxed">{summary}</p>
                </div>
              )}
            </div>
            
            {isPageLoading ? (
              <div className="space-y-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="h-8 w-1/4 bg-white/10 rounded-lg animate-pulse mb-4"></div>
                    <div className="p-4 bg-black/10 rounded-b-lg">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="flex flex-col items-center justify-center p-2">
                            <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 bg-white/5 rounded-full animate-pulse"></div>
                            <div className="h-4 w-24 bg-white/5 rounded mt-3 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                grouped.map(group => group.tokens.length > 0 && (
                    <Folder key={group.type} title={group.type}>
                    {group.tokens.map((a, i) => (
                        <Token
                        key={i}
                        activityName={a.activityName}
                        activityType={a.activityType}
                        image={a.image}
                        />
                    ))}
                    </Folder>
                ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
