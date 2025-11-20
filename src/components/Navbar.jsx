import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(){
return (
<nav className="bg-white shadow">
<div className="container mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="font-bold text-xl">Movie<span className="text-blue-600">App</span></Link>
<div>
<Link to="/add" className="bg-blue-600 text-white px-3 py-1 rounded">Add Movie</Link>
</div>
</div>
</nav>
)
}