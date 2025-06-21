'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WalletContextType {
  wallet: string | null
  setWallet: (wallet: string) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<string | null>(null)
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWalletContext must be used inside WalletProvider')
  return context
}