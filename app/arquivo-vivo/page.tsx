"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, ArrowLeft, Palette, Quote, Sparkles, Users, Eye } from "lucide-react"

interface CommunityEntry {
  id: number
  type: "feeling" | "phrase" | "symbol" | "color"
  content: string
  author: string
  timestamp: string
  neural_signature: string
  consciousness_level: number
}

export default function ArquivoVivoPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clientWidth, setClientWidth] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [selectedType, setSelectedType] = useState<"feeling" | "phrase" | "symbol" | "color">("feeling")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [entries, setEntries] = useState<CommunityEntry[]>([/* seus dados aqui */])
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientWidth(window.innerWidth)
      setClientHeight(window.innerHeight)
    }
  }, [])

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push(path)
    }, 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !author.trim()) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newEntry: CommunityEntry = {
      id: Date.now(),
      type: selectedType,
      content: content.trim(),
      author: author.trim(),
      timestamp: "Agora",
      neural_signature: `${author.slice(0, 2).toUpperCase()}_${Math.floor(Math.random() * 999)}`,
      consciousness_level: Math.floor(Math.random() * 20 + 80),
    }

    setEntries((prev) => [newEntry, ...prev])
    setContent("")
    setAuthor("")
    setIsSubmitting(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feeling":
        return <Heart className="w-4 h-4" />
      case "phrase":
        return <Quote className="w-4 h-4" />
      case "symbol":
        return <Sparkles className="w-4 h-4" />
      case "color":
        return <Palette className="w-4 h-4" />
      default:
        return <Heart className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feeling":
        return "text-pink-400"
      case "phrase":
        return "text-cyan-400"
      case "symbol":
        return "text-purple-400"
      case "color":
        return "text-yellow-400"
      default:
        return "text-pink-400"
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >
        {/* ... todo o conteúdo original permanece aqui */}

        {/* Floating particles corrigido */}
        {clientWidth > 0 &&
          [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  i % 3 === 0
                    ? "rgba(255, 105, 180, 0.1)"
                    : i % 3 === 1
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(0, 255, 247, 0.1)"
                } 0%, transparent 70%)`,
                width: `${Math.random() * 120 + 60}px`,
                height: `${Math.random() * 120 + 60}px`,
                filter: "blur(25px)",
              }}
              initial={{
                x: Math.random() * clientWidth,
                y: Math.random() * clientHeight,
              }}
              animate={{
                x: Math.random() * clientWidth,
                y: Math.random() * clientHeight,
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: Math.random() * 25 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
