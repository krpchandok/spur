'use client'

import { useState, useEffect } from "react"
import Nav from "@/app/Components/Nav"
function AdminSearchPage() {

    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState({
        location: "",
        level: "",
        school: ""
    })

    const removeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilters({...filters, [e.currentTarget.name]: ""})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        setFilters({
            location: data.location as string,
            level: data.level as string,
            school: data.school as string
        })
        setIsOpen(false)
    }
    

 
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 gap-8">
      <Nav/>

      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl px-4">
        <h1 className="text-5xl font-light text-white tracking-wide">Search</h1>
        <input className="w-1/2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-purple-400 focus:outline-none text-lg placeholder-white/60" placeholder="Search for a student" />
      </div>
      <div className="flex flex-row justify-center gap-4">
            {filters.location != "" && <button onClick={(e) => removeFilter(e)} name="location" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">{filters.location}</button>}
            {filters.level != "" && <button onClick={(e) => removeFilter(e)} name="level" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">{filters.level}</button>}
            {filters.school != "" && <button onClick={(e) => removeFilter(e)} name="school"     className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">{filters.school}</button>}
        </div>
      <div className="flex flex-col justify-center gap-4">
    
        <button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">Add Filter</button>
      </div>
      {isOpen && <div className="w-full max-w-4xl px-4">
        <form onSubmit={(e) => onSubmit(e)} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-white/90 font-medium text-base tracking-wide">Location</h2>
              <input name="location" className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-purple-400 focus:outline-none text-base placeholder-white/50" placeholder="Enter location" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-white/90 font-medium text-base tracking-wide">Education Level</h2>
              <select name="level" className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-purple-400 focus:outline-none text-base placeholder-white/50">
                <option value="High School">High School</option>
                <option value="Post-secondary">Post-Secondary</option>
                <option value="University">Masters</option>
                <option value="Phd">PhD</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-white/90 font-medium text-base tracking-wide">School</h2>
              <input name="school" className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-purple-400 focus:outline-none text-base placeholder-white/50" placeholder="Enter school" />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">Load Filters</button>
          </div>
      </form>
      </div>}
    </div>
  )
}

export default AdminSearchPage