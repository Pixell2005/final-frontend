import React from 'react'


export default function SearchBar({ value, onChange }){
return (
<div className="mb-4">
<input
value={value}
onChange={onChange}
placeholder="Search by title..."
className="w-full border rounded px-3 py-2"
/>
</div>
)
}