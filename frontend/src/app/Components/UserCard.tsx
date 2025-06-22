"use client"

interface UserCardProps {
  name: string
  location: string
  school: string
  onClick?: () => void
}

function UserCard({ name, location, school, onClick }: UserCardProps) {
  return (
    <div 
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-white font-medium text-lg tracking-wide">{name}</h3>
            <p className="text-white/70 text-sm">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-white/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-sm">{school}</span>
        </div>
      </div>
    </div>
  )
}

export default UserCard