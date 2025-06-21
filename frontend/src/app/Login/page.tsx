'use client'

import { useState, useEffect } from 'react'

function LoginPage() {
    const [currentTab, setCurrentTab] = useState('Student')

    const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentTab(e.currentTarget.value)
    }

    const isStudent = currentTab === 'Student'

    const studentTabStyles = isStudent ? " bg-white": "  bg-[#EDF6FF]"
    const mentorTabStyles = !isStudent ? " bg-white": "  bg-[#EDF6FF]"

    const backgroundStyles = !isStudent ? 'bg-white' : 'bg-[#437fc7]'
    const textStyles = !isStudent ? 'text-[#437fc7]' : 'text-white'
    const buttonStyles = isStudent ? 'bg-white text-[#437fc7]' : 'bg-[#437fc7] text-white'
    const boxShadow = !isStudent ? 'shadow-black/25' : 'shadow-white/25'

    return (
        <div className={`flex flex-col ${backgroundStyles} min-h-screen gap-8 p-4 sm:p-6 md:p-8`}>
            <div className="flex flex-row justify-between items-center">
                <h1 className={`text-5xl font-thin ${textStyles}`}>VouchU </h1>
                <button className={`font-manrope ${buttonStyles} px-4 py-2 rounded-lg font-semibold`}>Home</button>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className={`bg-white  shadow-lg ${boxShadow} rounded-lg w-full max-w-md`}>
                    <div className="flex flex-row items-center justify-center">
                        <button value="Student" onClick={(e) => handleTabChange(e)} className={`w-1/2 text-2xl rounded-tl-xl font-manrope text-black px-4 py-3 border-black ${studentTabStyles}`}>Student</button>
                        <button value="Mentor" onClick={(e) => handleTabChange(e)} className={`w-1/2 text-2xl rounded-tr-xl font-manrope text-black px-4 py-3 border-black ${mentorTabStyles}`}>Mentor</button>
                    </div>
                    <form className="flex flex-col gap-6 border-t-0 border-gray-200 p-8">
                        <h1 className="font-manrope font-light text-4xl text-black text-center">Login</h1>

                        <div className="flex flex-col gap-2">
                            <label className="font-manrope text-black font-medium">Email</label>
                            <input type="text" placeholder="Value" className="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-[#0052ff] focus:border-transparent transition" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-manrope text-black font-medium">Password</label>
                            <input type="password" placeholder="Value" className="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-[#0052ff] focus:border-transparent transition" />
                        </div>
                        
                        <button className="w-full rounded-lg bg-[#437FC7] hover:bg-[#6DAFFE] px-5 py-3 font-medium text-white mt-4 transition">
                            Sign In
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-[#B9732F]  text-sm underline hover:text-[#B9736B] transition">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage