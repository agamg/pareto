"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/navigation'
import Navbar from "@/components/navbar";

export default function BuildPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "Welcome to Pareto";
  const tagline = "Optimize Your Workflow";
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animateText = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / 2000, 1); // 2000ms (2s) for full animation
      const currentLength = Math.floor(progress * fullText.length);

      setText(fullText.slice(0, currentLength));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateText);
      } else {
        startTimeRef.current = null;
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animateText);
        }, 2000);
      }
    };

    animationRef.current = requestAnimationFrame(animateText);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleGetStarted = () => {
    router.push('/build');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
        <Navbar/>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/fred.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-bold mb-4 text-center">{text}</h1>
        <p className="text-2xl mb-8">{tagline}</p>
        <Button 
          variant="outline" 
          size="lg" 
          className="text-black bg-white hover:bg-gray-200"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}