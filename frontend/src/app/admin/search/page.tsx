import Nav from "@/app/Components/Nav"
function AdminSearchPage() {
  return (
    <div className="flex flex-col items-centers min-h-screen bg-[#221C3E] text-gray-300">
      <Nav />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-10">Search</h1>
        <input className="w-1/2 p-2 rounded-lg bg-[#C27BA0] text-white border-2 border-white/10 focus:border-white focus:outline-none" placeholder="Search for a student" />
      </div>

      
    </div>
  )
}

export default AdminSearchPage