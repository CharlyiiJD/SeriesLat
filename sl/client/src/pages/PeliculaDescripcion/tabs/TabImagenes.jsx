import React from 'react';

const TabImagenes = () => {
  const images = [
    "https://images.alphacoders.com/119/1191500.jpg",
    "https://images.alphacoders.com/119/1191505.jpg",
    "https://images.alphacoders.com/121/1213032.jpg",
    "https://images.alphacoders.com/119/1191504.jpg"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
      {images.map((img, i) => (
        <div key={i} className="group overflow-hidden rounded-2xl border border-white/10 aspect-video">
          <img 
            src={img} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 cursor-pointer" 
            alt="Movie Scene" 
          />
        </div>
      ))}
    </div>
  );
};

export default TabImagenes;