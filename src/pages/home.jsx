import React, { useEffect, useState } from 'react'
import { getMovies, deleteMovie } from '../services/api'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'


export default function Home(){
const [movies, setMovies] = useState([])
const [query, setQuery] = useState('')
const [loading, setLoading] = useState(false)


const fetchMovies = async () => {
setLoading(true)
try{
const q = query ? `?q=${encodeURIComponent(query)}` : ''
const res = await getMovies(q)
setMovies(res.data)
}catch(err){
console.error(err)
alert('Failed to fetch movies')
}finally{ setLoading(false) }
}


useEffect(()=>{ fetchMovies() }, [query])


async function handleDelete(id){
if(!confirm('Delete this movie?')) return
try{
await deleteMovie(id)
setMovies(prev => prev.filter(m => m.id !== id))
}catch(err){
console.error(err)
alert('Failed to delete')
}
}


return (
<div>
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-bold">Movies</h1>
</div>


<SearchBar value={query} onChange={(e)=>setQuery(e.target.value)} />


{loading ? <p>Loading...</p> : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{movies.map(movie => (
<MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
))}
</div>
)}


{(!loading && movies.length === 0) && (
<p className="mt-6 text-center text-gray-600">No movies found.</p>
)}
</div>
)
}