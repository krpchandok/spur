'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWalletContext } from '../../providers/WalletProvider'
import { useAccount } from 'wagmi'
<<<<<<< HEAD
import Nav from '@/app/Components/Nav'
import Token from '@/app/Components/Token'
import Folder from '@/app/Components/Folder'

const TOKEN_CATEGORIES = ["Sports", "Tech", "Hackathon", "Club"]

=======
import Token from '../../Components/Token'
import Folder from '../../Components/Folder'
import Nav from '../../Components/Nav'
>>>>>>> 9e68bad613a43c3566aececac8d4ec8e1009ebbb
export default function StudentWalletPage() {
  const { wallet, setWallet } = useWalletContext()
  const { address, isConnected } = useAccount()

  const [achievements, setAchievements] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!wallet && isConnected && address) {
      setWallet(address)
    }
  }, [wallet, address, isConnected, setWallet])

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!wallet) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${wallet}`);
        const raw = res.data.achievements;
  
        const withMetadata = await Promise.all(
          raw.map(async (a: any) => {
            try {
              const ipfsUrl = a.tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
              const metadataRes = await axios.get(ipfsUrl);
              return {
                ...a,
                image: metadataRes.data.image?.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'),
              };
            } catch {
              return a;
            }
          })
        );
  
        setAchievements(withMetadata);

        if (res.data.name) {
            setName(res.data.name);
        }

      } catch (err) {
        console.error('Failed to fetch achievements', err);
        setError('Could not load achievements');
      } finally {
        setLoading(false);
      }
    };
  
    if(wallet) fetchAchievements();
  }, [wallet]);

  if (error) {
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
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Nav />
      <main className="flex-1 p-4 sm:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-light tracking-wider mb-2">
              Welcome{name ? `, ${name}` : ''}!
            </h1>
            <p className="text-lg text-white/70">Here are your collected achievements.</p>
=======
    <div className="flex min-h-screen bg-[#221C3E] text-gray-300">
      <div className="flex flex-col flex-1">
       <Nav/>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold mb-4 text-white">My Tokens</h2>
              <div className="bg-[#2E2550] p-6 rounded-lg shadow-2xl">
                <div className="space-y-4">
                  <Folder />
                  <Folder />
                  <Folder />
                </div>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8">
                  {achievements.map((a, i) => (
                    <Token key={i} />
                  ))}
                </div>
              </div>
            </div>
>>>>>>> 9e68bad613a43c3566aececac8d4ec8e1009ebbb
          </div>

          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-8 w-1/4 bg-white/10 rounded-lg animate-pulse mb-4"></div>
                  <div className="p-4 bg-black/10 rounded-b-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                      {[...Array(4)].map((_, j) => (
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
            <div className="space-y-8">
              {grouped.map(group => group.tokens.length > 0 && (
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
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
