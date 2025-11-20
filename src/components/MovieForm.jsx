import React, { useState, useEffect } from 'react'


export default function MovieForm({ initial = { title: '', year: '', genre: '', poster: '' }, onSubmit }){
const [form, setForm] = useState(initial)


useEffect(()=>{
setForm(initial)
}, [initial])


function handleChange(e){
const { name, value } = e.target
setForm(prev => ({ ...prev, [name]: value }))
}


function submit(e){
e.preventDefault()
// simple validation
if(!form.title || !form.year) return alert('Title and year are required')
onSubmit(form)
}


return (
<form onSubmit={submit} className="bg-white p-4 shadow rounded">
<div className="mb-3">
<label className="block text-sm">Title</label>
<input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-2 py-1" />
</div>


<div className="mb-3 grid grid-cols-2 gap-3">
<div>
<label className="block text-sm">Year</label>
<input name="year" value={form.year} onChange={handleChange} className="w-full border rounded px-2 py-1" />
</div>
<div>
<label className="block text-sm">Genre</label>
<input name="genre" value={form.genre} onChange={handleChange} className="w-full border rounded px-2 py-1" />
</div>
</div>


<div className="mb-3">
<label className="block text-sm">Poster URL</label>
<input name="poster" value={form.poster} onChange={handleChange} className="w-full border rounded px-2 py-1" />
</div>


<div className="flex justify-end">
<button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
</div>
</form>
)
}