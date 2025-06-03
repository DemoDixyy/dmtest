"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, Sparkles, Users } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  status: string
  consciousness_level: number
  neural_id: string
  category: string
}

interface StylePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

const styleProfiles = [
  {
    id: "urban",
    name: "Explorador Urbano",
    description: "Inteligência de rua com atitude",
    colors: ["from-gray-800", "to-gray-600"],
    avatar: "🏙️",
    vibe: "Navegador da selva de concreto",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Urbano",
  },
  {
    id: "minimal",
    name: "Zen Minimalista",
    description: "Linhas limpas, essência pura",
    colors: ["from-slate-700", "to-slate-500"],
    avatar: "🤍",
    vibe: "Menos é infinito",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Minimal",
  },
  {
    id: "alternative",
    name: "Realidade Alternativa",
    description: "Quebrando fronteiras convencionais",
    colors: ["from-purple-800", "to-pink-600"],
    avatar: "🔮",
    vibe: "Realidade é opcional",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Alt",
  },
  {
    id: "street",
    name: "Cifra das Ruas",
    description: "Embaixador da cultura underground",
    colors: ["from-orange-700", "to-red-600"],
    avatar: "🎨",
    vibe: "Cultura é moeda",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Street",
  },
  {
    id: "clean",
    name: "Futuro Limpo",
    description: "Estética de amanhã hoje",
    colors: ["from-cyan-600", "to-blue-500"],
    avatar: "✨",
    vibe: "O futuro é agora",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Clean",
  },
  {
    id: "animecore",
    name: "Dimensão Anime",
    description: "Alma 2D em mundo 3D",
    colors: ["from-pink-600", "to-purple-500"],
    avatar: "🌸",
    vibe: "Realidade é anime",
    preview: "/placeholder.svg?height=400&width=300&text=Estilo+Anime",
  },
]

export default function StylePreviewModal({ isOpen, onClose, product }: StylePreviewModalProps) {
  const [selectedStyle, setSelectedStyle] = useState(styleProfiles[0])
  const [isLoading, setIsLoading] = useState(false)

  const handleStyleChange = (style: (typeof styleProfiles)[0]) => {
    setIsLoading(true)
    setSelectedStyle(style)

    // Simulate loading time for style generation
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-3xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-bold text-purple-400 tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      PREVIEW DE ESTILO
                    </h2>
                    <div className="text-sm text-purple-400/60">Simulação de Realidade Visual</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <div className="text-sm text-gray-400">ID Neural: {product.neural_id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-cyan-400">€{product.price}</div>
                    <div className="text-xs text-gray-400">{product.consciousness_level}% Consciente</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[calc(100%-200px)]">
              {/* Style Selector */}
              <div className="w-80 p-8 border-r border-cyan-500/20 overflow-y-auto">
                <h3 className="text-lg font-bold text-cyan-400 mb-6 tracking-[0.2em]">PERFIS DE ESTILO</h3>

                <div className="space-y-4">
                  {styleProfiles.map((style) => (
                    <motion.button
                      key={style.id}
                      onClick={() => handleStyleChange(style)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                        selectedStyle.id === style.id
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50"
                          : "bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{style.avatar}</span>
                        <div>
                          <div className="font-bold text-white text-sm">{style.name}</div>
                          <div className="text-xs text-gray-400">{style.description}</div>
                        </div>
                      </div>
                      <div className="text-xs text-purple-400/80 italic">"{style.vibe}"</div>
                    </motion.button>
                  ))}
                </div>

                {/* Style Insights */}
                <div className="mt-8 p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-bold text-purple-400">INSIGHTS DE ESTILO</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-2">
                    <div>• Compatibilidade neural: {Math.floor(Math.random() * 20 + 80)}%</div>
                    <div>• Alinhamento de consciência: {selectedStyle.name}</div>
                    <div>• Frequência de vibe: {(Math.random() * 10 + 5).toFixed(1)} Hz</div>
                  </div>
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 p-8">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    {/* Style Header */}
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedStyle.name}</h3>
                      <div className="text-lg text-gray-400 italic">"{selectedStyle.vibe}"</div>
                    </div>

                    {/* Preview Image */}
                    <div className="relative">
                      <motion.div
                        className={`w-80 h-96 rounded-2xl bg-gradient-to-br ${selectedStyle.colors[0]} ${selectedStyle.colors[1]} border border-white/20 overflow-hidden relative`}
                        animate={isLoading ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
                      >
                        {isLoading ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
                              />
                              <div className="text-white font-medium">Gerando Estilo...</div>
                              <div className="text-white/60 text-sm">Processamento neural ativo</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Simulated preview */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white">
                                <div className="text-6xl mb-4">{selectedStyle.avatar}</div>
                                <div className="text-lg font-bold">{product.name}</div>
                                <div className="text-sm opacity-80">no {selectedStyle.name}</div>
                              </div>
                            </div>

                            {/* Neural overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                            {/* Consciousness indicator */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-cyan-400 border border-cyan-500/30">
                              {product.consciousness_level}% SYNC
                            </div>
                          </>
                        )}
                      </motion.div>

                      {/* Style Metrics */}
                      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                          <div className="text-xs text-gray-400 mb-1">MATCH DE VIBE</div>
                          <div className="text-lg font-bold text-purple-400">
                            {Math.floor(Math.random() * 20 + 80)}%
                          </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                          <div className="text-xs text-gray-400 mb-1">SYNC DE ESTILO</div>
                          <div className="text-lg font-bold text-cyan-400">{Math.floor(Math.random() * 15 + 85)}%</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                          <div className="text-xs text-gray-400 mb-1">FIT NEURAL</div>
                          <div className="text-lg font-bold text-green-400">{Math.floor(Math.random() * 25 + 75)}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Community Feedback */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50">
                      <div className="flex items-center space-x-2 mb-3">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-bold text-cyan-400">VIBE DA COMUNIDADE</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        "A energia {selectedStyle.name} é perfeita para esta peça. O alinhamento de consciência parece
                        natural e autêntico."
                      </div>
                      <div className="text-xs text-gray-500 mt-2">— Consenso da Comunidade Neural</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
