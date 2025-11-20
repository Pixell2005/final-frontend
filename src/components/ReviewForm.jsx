import React, { useState } from "react";


export default function ReviewForm({ onSubmit }) {
const [text, setText] = useState("");
const [rating, setRating] = useState(5);


function submit(e) {
e.preventDefault();
onSubmit({ text, rating });
setText("");
}


return (
<form
onSubmit={submit}
className="mt-6 p-4 bg-white shadow rounded-xl border"
>
<h3 className="font-bold text-xl mb-3">Add Review</h3>


<textarea
value={text}
onChange={(e) => setText(e.target.value)}
className="w-full border rounded-xl p-3 mb-3"
placeholder="Tulis review..."
/>


<div className="flex items-center gap-3 mb-3">
<label className="font-medium">Rating:</label>
<select
value={rating}
onChange={(e) => setRating(e.target.value)}
className="border rounded-xl px-3 py-1"
>
{[1, 2, 3, 4, 5].map((n) => (
<option key={n} value={n}>{n}</option>
))}
</select>
</div>


<button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
Submit
</button>
</form>
);
}