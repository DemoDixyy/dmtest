"use client"

import { motion } from "framer-motion"

interface MarqueeTextProps {
  text: string
  className?: string
}

export default function MarqueeText({
  text = "Dem Claire - New Drops - Free Shipping on Orders Over $50 - Limited Edition Drops - Streetwear with a Futuristic Edge",
  className = "",
}: MarqueeTextProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center h-16 px-4">
        <motion.div
          className="whitespace-nowrap text-cyan-300/80 font-light tracking-[0.1em]"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {text}
        </motion.div>
      </div>
    </div>
  )
}
