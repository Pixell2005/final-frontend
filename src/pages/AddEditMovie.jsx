import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MovieForm from '../components/MovieForm'
import { createMovie, getMovie, updateMovie } from '../services/api'


export default function AddEditMovie(){
const { id } = useParams()
const navigate = useNavigate()
const [initial, setInitial] = useState(null)
const [loading, setLoading] = useState(false)


useEffect(()=>{
if(id){
setLoading(true)
getMovie(id).then(res => setInitial(res.data)).catch(err => alert('Failed to load')).finally(()=>setLoading(false))
} else {
setInitial({ title: '', year: '', genre: '', poster: '' })
}
}, [id])


async function handleSubmit(data){
try{
if(id){
await updateMovie(id, data)
alert('Updated')
} else {
await createMovie(data)
alert('Created')
}
navigate('/')
}catch(err){
console.error(err)
alert('Failed to save')
}
}


if(loading || !initial) return <p>Loading...</p>


return (
<div>
<h1 className="text-2xl font-bold mb-4">{id ? 'Edit Movie' : 'Add Movie'}</h1>
<MovieForm initial={initial} onSubmit={handleSubmit} />
</div>
)
}