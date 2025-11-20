import React from 'react'
import { Link } from 'react-router-dom'


export default function MovieCard({ movie, onDelete }){
return (
<div className="bg-white shadow rounded overflow-hidden">
<img src={movie.poster} alt={movie.title} className="w-full h-56 object-cover"/>
<div className="p-4">
<h3 className="font-bold text-lg">{movie.title} <span className="text-sm text-gray-500">({movie.year})</span></h3>
<p className="text-sm text-gray-600">{movie.genre}</p>
<div className="mt-3 flex gap-2">
<Link to={`/edit/${movie.id}`} className="px-3 py-1 border rounded">Edit</Link>
<button onClick={() => onDelete(movie.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
</div>
</div>
</div>
)
}