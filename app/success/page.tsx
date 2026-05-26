'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Trigger confetti animation
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from all directions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.9) },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-pink-100 to-red-100 -z-10" />

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        {isMounted && [...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 animate-bounce">
        <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-4">
          I LOVE YOU! 💕
        </h1>
        <p className="text-2xl md:text-3xl text-pink-600 mb-8">
          You just made me the happiest person alive!
        </p>

        {/* Heart Animation */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="text-6xl animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl max-w-2xl mb-8">
          <p className="text-xl text-gray-700 mb-4">
            You've made me the happiest by saying yes! Let's make this Valentine's Day unforgettable together.
          </p>
          <p className="text-lg text-pink-600 font-semibold">
            Forever yours 💕
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95">
              Back to Gallery 📸
            </button>
          </Link>
          <button
            onClick={() => router.refresh()}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            Celebrate Again 🎉
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
