'use client'

import { useState } from 'react'

function LoginPage() {
    const [currentTab, setCurrentTab] = useState('Student')

    const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentTab(e.currentTarget.value)
    }

    const isStudent = currentTab === 'Student'

    const studentTabStyles = isStudent ? 'bg-[#2E2550] text-white' : 'bg-transparent text-gray-400'
    const mentorTabStyles = !isStudent ? 'bg-[#2E2550] text-white' : 'bg-transparent text-gray-400'
    const backgroundStyles = isStudent ? 'bg-[#221C3E]' : 'bg-gray-100' 
    const textStyles = isStudent ? 'text-white' : 'text-black'
    const buttonStyles = isStudent ? 'bg-[#6D28D9] text-white' : 'bg-white text-[#6D28D9]'

    return (
        <div className={`flex flex-col ${backgroundStyles} min-h-screen gap-8 p-4 sm:p-6 md:p-8 transition-colors duration-500`}>
            <div className="flex flex-row justify-between items-center">
                <h1 className={`text-5xl font-thin ${textStyles}`}>Legitamint</h1>
                <button className={`font-manrope px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${buttonStyles}`}>
                    Home
                </button>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-[#2E2550] shadow-2xl rounded-lg w-full max-w-md">
                    <div className="flex flex-row items-center justify-center bg-[#221C3E] rounded-t-lg">
                        <button value="Student" onClick={(e) => handleTabChange(e)} className={`w-1/2 text-xl rounded-tl-lg font-manrope px-4 py-3 transition-colors duration-300 ${studentTabStyles}`}>
                            Student
                        </button>
                        <button value="Mentor" onClick={(e) => handleTabChange(e)} className={`w-1/2 text-xl rounded-tr-lg font-manrope px-4 py-3 transition-colors duration-300 ${mentorTabStyles}`}>
                            Mentor
                        </button>
                    </div>
                    <form className="flex flex-col gap-6 p-8">
                        <h1 className="font-manrope font-light text-4xl text-white text-center">Login</h1>

                        <div className="flex flex-col gap-2">
                            <label className="font-manrope text-purple-300 font-medium">Email</label>
                            <input type="text" placeholder="you@email.com" className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-manrope text-purple-300 font-medium">Password</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-lg bg-white/5 border-purple-400/30 border p-3 text-sm text-white focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition" />
                        </div>
                        
                        <button className="w-full rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] px-5 py-3 font-medium text-white mt-4 transition">
                            Sign In
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-purple-400 text-sm underline hover:text-purple-300 transition">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage