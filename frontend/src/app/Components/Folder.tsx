"use client"

import { useState } from "react"
import Token from "./Token"
function Folder() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="bg-[#3730A3] p-4 rounded-lg text-lg font-semibold hover:bg-[#4338CA] transition-colors duration-200">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left text-white">Folder Name</button>
      </div>
      {isOpen && (
      <div className="bg-[#221C3E] p-4 rounded-b-lg grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Token />
          <Token />
          <Token />
          <Token />
          <Token />
          <Token />
          <Token />
      </div>
      )}
    </div>
  )
}
export default Folder;