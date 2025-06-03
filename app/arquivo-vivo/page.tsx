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
  const [selectedType, setSelectedType] = useState<"feeling" | "phrase" | "symbol" | "color">("feeling")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [entries, setEntries] = useState<CommunityEntry[]>([
    {
      id: 1,
      type: "feeling",
      content: "A sensação de estar entre mundos, onde o digital e o físico se encontram em harmonia perfeita.",
      author: "Neural_Wanderer",
      timestamp: "2 horas atrás",
      neural_signature: "NW_847",
      consciousness_level: 94,
    },
    {
      id: 2,
      type: "phrase",
      content: "Somos a geração que veste o futuro enquanto honra o presente.",
      author: "Consciousness_Poet",
      timestamp: "5 horas atrás",
      neural_signature: "CP_291",
      consciousness_level: 87,
    },
    {
      id: 3,
      type: "symbol",
      content: "∞",
      author: "Infinite_Mind",
      timestamp: "1 dia atrás",
      neural_signature: "IM_156",
      consciousness_level: 91,
    },
    {
      id: 4,
      type: "color",
      content: "#00fff7",
      author: "Cyan_Dreamer",
      timestamp: "2 dias atrás",
      neural_signature: "CD_423",
      consciousness_level: 89,
    },
    {
      id: 5,
      type: "feeling",
      content: "Quando visto uma peça da Dem Claire, sinto que minha identidade se expande além dos limites físicos.",
      author: "Expanded_Self",
      timestamp: "3 dias atrás",
      neural_signature: "ES_672",
      consciousness_level: 96,
    },
  ])
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

    // Simulate submission
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
        {/* Dynamic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-black to-purple-900/10" />

        {/* Interactive mouse effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 105, 180, 0.15), transparent 50%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Header */}
        <header className="relative z-10 border-b border-pink-500/20 px-8 py-6 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavigation("/home")}
                className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-pink-400" />
              </button>
              <div>
                <h1
                  className="text-2xl font-bold tracking-[0.3em] text-pink-400 uppercase"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  ARQUIVO VIVO
                </h1>
                <div className="text-xs tracking-[0.2em] text-pink-400/60">ESPAÇO DE ESCUTA DA MARCA</div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs text-pink-400/60">COMUNIDADE ATIVA</div>
                <div className="text-lg font-bold text-pink-400">{entries.length}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-400/60">CONSCIÊNCIAS</div>
                <div className="text-lg font-bold text-purple-400">{Math.floor(Math.random() * 500 + 1000)}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-extralight tracking-[0.3em] mb-8 text-gradient">ARQUIVO VIVO</h1>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Este é um espaço sagrado onde nossa comunidade compartilha o que sente, pensa e vive. Não estamos aqui
              para criar juntos, mas para registrar a essência do momento presente que cada consciência está vivendo.
            </p>
            <div className="text-lg text-pink-400/80 italic">
              "Cada entrada é um fragmento de alma, uma janela para o universo interior de quem se conecta conosco."
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Submission Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="rounded-3xl bg-glass border border-pink-500/30 p-8 backdrop-blur-xl sticky top-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-pink-400">Compartilhe Sua Essência</h2>
                    <div className="text-sm text-pink-400/60">O que você está sentindo hoje?</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Tipo de Expressão</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "feeling", label: "Sentimento", icon: Heart, color: "pink" },
                        { id: "phrase", label: "Frase", icon: Quote, color: "cyan" },
                        { id: "symbol", label: "Símbolo", icon: Sparkles, color: "purple" },
                        { id: "color", label: "Cor", icon: Palette, color: "yellow" },
                      ].map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id as any)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            selectedType === type.id
                              ? `bg-${type.color}-500/20 border-${type.color}-400/50`
                              : "bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <type.icon className={`w-4 h-4 text-${type.color}-400`} />
                            <span className="text-sm font-medium text-white">{type.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Content Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {selectedType === "feeling" && "Descreva seu sentimento"}
                      {selectedType === "phrase" && "Compartilhe sua frase"}
                      {selectedType === "symbol" && "Qual símbolo representa você hoje?"}
                      {selectedType === "color" && "Que cor define seu momento?"}
                    </label>
                    {selectedType === "color" ? (
                      <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="#00fff7 ou nome da cor"
                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none transition-colors"
                      />
                    ) : (
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={
                          selectedType === "feeling"
                            ? "Expresse o que está sentindo neste momento..."
                            : selectedType === "phrase"
                              ? "Uma frase que ressoa com você hoje..."
                              : "Um símbolo que representa sua energia atual..."
                        }
                        rows={selectedType === "symbol" ? 2 : 4}
                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none transition-colors resize-none"
                      />
                    )}
                  </div>

                  {/* Author Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Como quer ser chamado?</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Seu nome ou apelido neural"
                      className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!content.trim() || !author.trim() || isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold tracking-[0.1em] transition-all duration-300 flex items-center justify-center space-x-2 ${
                      !content.trim() || !author.trim() || isSubmitting
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400"
                    }`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                        />
                        <span>REGISTRANDO...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>COMPARTILHAR ESSÊNCIA</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Community Stats */}
                <div className="mt-8 pt-6 border-t border-pink-500/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-pink-400">{entries.length}</div>
                      <div className="text-xs text-gray-400">Essências Compartilhadas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{Math.floor(Math.random() * 50 + 150)}</div>
                      <div className="text-xs text-gray-400">Consciências Conectadas</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Community Feed */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400">Arquivo da Comunidade</h2>
                    <div className="text-sm text-purple-400/60">Registros vivos de nossa consciência coletiva</div>
                  </div>
                </div>

                <AnimatePresence>
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="rounded-2xl bg-glass border border-gray-700/30 p-6 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center ${getTypeColor(entry.type)}`}
                        >
                          {getTypeIcon(entry.type)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-bold text-white">{entry.author}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full bg-gray-800/50 ${getTypeColor(entry.type)}`}
                            >
                              {entry.type}
                            </span>
                            <span className="text-xs text-gray-500">{entry.timestamp}</span>
                          </div>

                          <div className="mb-4">
                            {entry.type === "color" ? (
                              <div className="flex items-center space-x-3">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-white/20"
                                  style={{ backgroundColor: entry.content }}
                                />
                                <span className="text-gray-300 font-mono">{entry.content}</span>
                              </div>
                            ) : entry.type === "symbol" ? (
                              <div className="text-4xl text-center py-4">{entry.content}</div>
                            ) : (
                              <p className="text-gray-300 leading-relaxed italic">"{entry.content}"</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>Neural: {entry.neural_signature}</span>
                              <span>Consciência: {entry.consciousness_level}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 50 + 10)} visualizações</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-pink-500/20 p-8 text-center backdrop-blur-xl">
          <div className="text-xs tracking-[0.4em] text-gray-500 font-light">
            © 2025 DEM CLAIRE — ARQUIVO VIVO DA CONSCIÊNCIA COLETIVA
          </div>
          <div className="mt-2 text-xs text-pink-400/60">
            ESSÊNCIAS REGISTRADAS: {entries.length} | CONSCIÊNCIAS ATIVAS: {Math.floor(Math.random() * 100 + 200)} |
            STATUS: ESCUTANDO
          </div>
        </footer>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
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
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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
