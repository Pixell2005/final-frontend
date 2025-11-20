import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(){
return (
<nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <Link className="font-bold text-2xl text-blue-600 tracking-tight">
      MovieApp
    </Link>
    <Link className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
      Add Movie
    </Link>
  </div>
</nav>

)
}