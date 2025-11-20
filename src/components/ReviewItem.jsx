export default function ReviewItem({ review }) {
return (
<div className="p-4 bg-gray-100 rounded-xl">
<p className="font-semibold">⭐ {review.rating}/5</p>
<p className="text-gray-700">{review.text}</p>
</div>
);
}