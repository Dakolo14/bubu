'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [noButtonSize, setNoButtonSize] = useState(100);
  const [noClicks, setNoClicks] = useState(0);
  const [messages, setMessages] = useState<string[]>([
    'Please say yes! 💕',
    'I\'m sure you didn\'t mean that... 😢',
    'Please! 🥺',
    'Come on... 💔',
    'Pretty please with hearts on top? 💗',
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Sample images for the gallery - you can replace these with your own images
  const galleryImages = [
    'https://t3.ftcdn.net/jpg/05/36/90/36/360_F_536903680_10hquiCjziB2Kux3bVSD1EnC2rdNzSg2.jpg',
    'https://media.istockphoto.com/id/1368004438/photo/shot-of-a-couple-enjoying-a-day-at-the-beach.jpg?s=612x612&w=0&k=20&c=hMi6N-u6baFHC-P8C-8X_5iFshdPPicx7BCrBGM8ARc=',
    '/bbb.png',
    'https://images.unsplash.com/photo-1516736712202-577b13d7f9e9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1528895167454-7f73ce70eb8c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531162521250-fd45fed19c37?w=600&h=600&fit=crop',
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleYes = () => {
    router.push('/success');
  };

  const handleNo = () => {
    setNoClicks(prev => prev + 1);
    
    // Enlarge the No button and shrink the Yes button
    setNoButtonSize(prev => Math.max(prev * 0.7, 40));
    
    // Update message
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    }
    
    // Move the No button randomly if it's clicked too many times
    if (noClicks > 2) {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      const noButton = document.getElementById('no-button');
      if (noButton) {
        noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8 animate-bounce">
        <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-2">
          Happy Valentine's Day! 💕
        </h1>
        <p className="text-xl text-pink-600">I have something special to ask you...</p>
      </div>

      {/* Image Gallery Section */}
      <div className="mb-12 max-w-2xl w-full">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Main Image Display */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-pink-200 to-red-200 flex items-center justify-center">
            <Image
              src={galleryImages[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      </div>

      {/* Engaging Question */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Will you be my Valentine? 🌹
        </h2>
        {noClicks > 0 && (
          <p className="text-lg text-pink-600 animate-pulse">
            {messages[Math.min(currentMessageIndex, messages.length - 1)]}
          </p>
        )}
      </div>

      {/* Yes/No Buttons */}
      <div className="flex gap-6 md:gap-8 justify-center items-center flex-wrap">
        {/* Yes Button - grows with each No click */}
        <button
          onClick={handleYes}
          style={{
            fontSize: `${18 + noClicks * 4}px`,
            padding: `${16 + noClicks * 3}px ${32 + noClicks * 4}px`,
          }}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          YES! 💕
        </button>

        {/* No Button - shrinks and runs away */}
        <button
          id="no-button"
          onClick={handleNo}
          style={{
            width: `${noButtonSize}px`,
            fontSize: `${14 - noClicks * 1}px`,
          }}
          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 overflow-hidden"
        >
          NO
        </button>
      </div>

      {/* Decorative Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
