"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DotsCarouselProps {
  images?: string[]
  className?: string
}

export default function DotsCarousel({
  images = [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
  className = "",
}: DotsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={`relative ${className}`}>
      {/* Image Container */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`Update ${activeIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 holographic opacity-30" />
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-4 mt-8">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-cyan-400 shadow-[0_0_15px_#00fff7]" : "bg-gray-600 hover:bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow: index === activeIndex ? "0 0 15px #00fff7, 0 0 25px #00fff7" : "0 0 5px rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
