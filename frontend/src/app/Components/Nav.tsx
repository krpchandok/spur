import Link from "next/link"

function Nav() {
  return (<header className="flex justify-between items-center p-4 sm:p-6 bg-[#2E2550] border-b border-white/10">
    <h1 className="text-2xl sm:text-3xl font-bold text-white">LEGITAMINT</h1>
    <div className="flex w-full mt-auto">
      <Link href="/profile/" className="ml-auto">
        <button className="bg-[#6D28D9] text-white px-4 py-2 sm:px-6 rounded-lg font-semibold hover:bg-[#5B21B6] transition">
          View Profile
        </button>
      </Link>
    </div>
  </header>
  )
}

export default Nav;