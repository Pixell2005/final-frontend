import React from 'react';

export default function TrailerEmbed({ youtubeId }) {
  if (!youtubeId) return null;
  return (
    <div className="mt-6 rounded-xl overflow-hidden shadow-xl">
      <iframe
        title="trailer"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        width="100%"
        height="400"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
