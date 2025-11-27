import React, { useState, useRef } from "react";

export default function ImageUploader({ value, onChange }) {
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef();

  function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange(e.target.result); // kirim base64 ke MovieForm
    };
    reader.readAsDataURL(file); // baca file gambar
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files); // ambil file asli
  }

  function handleSelect(e) {
    handleFiles(e.target.files);
  }

  return (
    <div className="space-y-2">

      {/* Dropzone */}
      <div
        className="w-full h-40 border-2 border-dashed flex items-center justify-center rounded-md cursor-pointer bg-gray-50"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full object-cover rounded"
          />
        ) : (
          <p className="text-gray-500">Drop an image here or click to upload</p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />
    </div>
  );
}
