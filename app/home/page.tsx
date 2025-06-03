"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ShoppingCart, Mail, Gift } from "lucide-react"
import NeuralGrid from "@/components/neural-grid"
import NeuralTerminal from "@/components/neural-terminal"
import BrainWave from "@/components/brain-wave"
import NeuralCart from "@/components/neural-cart"
import StylePreviewModal from "@/components/style-preview-modal"
import NewsletterModal from "@/components/newsletter-modal"
import PriceCounter from "@/components/price-counter"
import SoundButton from "@/components/sound-button"

interface Product {
  id: number
  name: string
  price: number
  status: string
  consciousness_level: number
  neural_id: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("TODOS")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("Comércio")
  const [neuralSync, setNeuralSync] = useState(87.3)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedProductForPreview, setSelectedProductForPreview] = useState<Product | null>(null)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [showPresaleModal, setShowPresaleModal] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
  const router = useRouter()

  // Memoizar produtos para melhor performance
  const products: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Jaqueta Neural",
        price: 520,
        status: "SYNCED",
        consciousness_level: 94,
        neural_id: "NJ001",
        category: "NEURAL",
      },
      {
        id: 2,
        name: "Moletom Sináptico",
        price: 380,
        status: "ACTIVE",
        consciousness_level: 87,
        neural_id: "SH002",
        category: "SYNAPTIC",
      },
      {
        id: 3,
        name: "Calça Quântica",
        price: 450,
        status: "LINKED",
        consciousness_level: 91,
        neural_id: "QP003",
        category: "QUANTUM",
      },
      {
        id: 4,
        name: "Bolsa Consciente",
        price: 290,
        status: "AWARE",
        consciousness_level: 83,
        neural_id: "CB004",
        category: "CONSCIOUS",
      },
      {
        id: 5,
        name: "Tênis Neural",
        price: 480,
        status: "SYNCED",
        consciousness_level: 96,
        neural_id: "NS005",
        category: "NEURAL",
      },
      {
        id: 6,
        name: "Óculos Mentais",
        price: 340,
        status: "ACTIVE",
        consciousness_level: 89,
        neural_id: "MG006",
        category: "NEURAL",
      },
      {
        id: 7,
        name: "Luvas Cyber",
        price: 220,
        status: "LINKED",
        consciousness_level: 78,
        neural_id: "CG007",
        category: "CYBER",
      },
      {
        id: 8,
        name: "Relógio Holo",
        price: 650,
        status: "SYNCED",
        consciousness_level: 92,
        neural_id: "HW008",
        category: "QUANTUM",
      },
      {
        id: 9,
        name: "Faixa Neural",
        price: 420,
        status: "AWARE",
        consciousness_level: 88,
        neural_id: "NH009",
        category: "NEURAL",
      },
    ],
    [],
  )

  const productsPerPage = 6
  const totalPages = Math.ceil(products.length / productsPerPage)
  const currentProducts = useMemo(
    () => products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage),
    [products, currentPage, productsPerPage],
  )

  // Mostrar modal de boas-vindas na primeira visita
  useEffect(() => {
    const hasVisited = localStorage.getItem("dem-claire-visited")
    if (!hasVisited) {
      setTimeout(() => {
        setShowNewsletterModal(true)
      }, 3000)
      localStorage.setItem("dem-claire-visited", "true")
    }
  }, [])

  // Otimizar mouse tracking
  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    // Reduzir frequência de atualização do neural sync
    const syncInterval = setInterval(() => {
      setNeuralSync((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(75, Math.min(99.9, prev + change))
      })
    }, 5000)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(syncInterval)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleNavigation = useCallback(
    (path: string) => {
      setIsTransitioning(true)
      setTimeout(() => {
        router.push(path)
      }, 600)
    },
    [router],
  )

  const handleTabClick = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      if (tab === "Neural") {
        handleNavigation("/neural")
      } else if (tab === "Sync") {
        handleNavigation("/sync")
      } else if (tab === "Interface") {
        handleNavigation("/info")
      } else if (tab === "Arquivo") {
        handleNavigation("/arquivo-vivo")
      }
    },
    [handleNavigation],
  )

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }, [])

  const updateCartQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleProductClick = useCallback(
    (productId: number) => {
      router.push(`/produto/${productId}`)
    },
    [router],
  )

  const categories = useMemo(() => ["TODOS", "NEURAL", "QUANTUM", "SYNAPTIC", "CONSCIOUS", "CYBER"], [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "ACTIVE":
        return "from-cyan-500 to-blue-500"
      case "AWARE":
        return "from-red-500 to-pink-500"
      case "SYNCED":
        return "from-purple-500 to-indigo-500"
      case "LINKED":
        return "from-yellow-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }, [])

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "TODOS"
        ? currentProducts
        : currentProducts.filter((product) => product.category === selectedCategory),
    [selectedCategory, currentProducts],
  )

  const totalCartItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Neural background - simplificado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-900/30" />

      {/* Interactive neural field - otimizado */}
      <div
        className="absolute inset-0 opacity-10 transition-all duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 247, 0.1), transparent 50%)`,
        }}
      />

      {/* Neural status bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/50 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          animate={{ width: `${neuralSync}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Header - responsivo */}
      <header className="relative z-10 bg-gradient-to-r from-black/90 to-gray-900/90 border-b border-cyan-500/20 px-4 md:px-8 py-4 md:py-6 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Neural logo */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center relative">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div>
                <h1
                  className="text-lg md:text-2xl font-bold tracking-[0.3em] text-cyan-400 uppercase"
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    textShadow: "0 0 10px #00fff7",
                  }}
                >
                  DEM CLAIRE
                </h1>
                <div className="text-xs tracking-[0.2em] text-cyan-400/60">COMÉRCIO NEURAL</div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              {["Neural", "Sync", "Comércio", "Interface", "Arquivo"].map((item) => (
                <SoundButton
                  key={item}
                  onClick={() => handleTabClick(item)}
                  soundType="cyber"
                  className={`px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium tracking-[0.1em] transition-all duration-300 uppercase relative ${
                    activeTab === item
                      ? "text-white bg-cyan-500/20 shadow-[0_0_15px_rgba(0,255,247,0.3)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  {item}
                  {activeTab === item && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-cyan-400/50"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </SoundButton>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Newsletter e Presale buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <SoundButton
                onClick={() => setShowNewsletterModal(true)}
                soundType="neural"
                className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300"
                title="Newsletter Neural"
              >
                <Mail className="w-4 h-4" />
              </SoundButton>
              <SoundButton
                onClick={() => setShowPresaleModal(true)}
                soundType="power"
                className="p-2 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all duration-300"
                title="Pré-venda Exclusiva"
              >
                <Gift className="w-4 h-4" />
              </SoundButton>
            </div>

            {/* Neural sync indicator */}
            <div className="text-right hidden md:block">
              <div className="text-xs text-cyan-400/60 tracking-[0.1em]">NEURAL SYNC</div>
              <div className="text-sm font-bold text-cyan-400">{neuralSync.toFixed(1)}%</div>
            </div>

            <SoundButton
              onClick={() => setIsCartOpen(true)}
              soundType="glitch"
              className="bg-white text-black px-3 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold tracking-[0.1em] hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2"
              style={{
                fontFamily: "var(--font-orbitron)",
              }}
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden md:inline">CARRINHO NEURAL</span>
              <span>[{totalCartItems}]</span>
            </SoundButton>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Neural Sidebar - responsivo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-96 border-b lg:border-r lg:border-b-0 border-cyan-500/20 p-4 md:p-6 backdrop-blur-xl space-y-6 md:space-y-8"
        >
          {/* Neural Grid */}
          <div>
            <h2 className="text-base md:text-lg font-bold tracking-[0.3em] mb-4 md:mb-6 text-cyan-400 relative">
              NEURAL GRID
              <div className="absolute -top-1 -left-1 text-xs text-gray-500 tracking-[0.2em]">SYNAPTIC</div>
            </h2>
            <div className="rounded-2xl bg-black/50 border border-cyan-500/30 overflow-hidden backdrop-blur-xl">
              <NeuralGrid />
            </div>
          </div>

          {/* Brain Wave Monitor */}
          <div>
            <h2 className="text-base md:text-lg font-bold tracking-[0.3em] mb-4 md:mb-6 text-cyan-400">
              ONDA DE CONSCIÊNCIA
            </h2>
            <div className="rounded-2xl bg-black/50 border border-cyan-500/30 p-4 md:p-6 backdrop-blur-xl">
              <BrainWave intensity={1.5} className="h-16 md:h-24" />
              <div className="mt-4 text-xs text-cyan-400/60 text-center tracking-[0.1em]">
                THETA: 8.2Hz | ALPHA: 12.1Hz | BETA: 18.7Hz
              </div>
            </div>
          </div>

          {/* Newsletter/Presale CTAs - Mobile */}
          <div className="md:hidden space-y-3">
            <SoundButton
              onClick={() => setShowNewsletterModal(true)}
              soundType="neural"
              className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 py-3 rounded-xl text-sm font-medium tracking-[0.1em] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>NEWSLETTER NEURAL</span>
            </SoundButton>
            <SoundButton
              onClick={() => setShowPresaleModal(true)}
              soundType="power"
              className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 py-3 rounded-xl text-sm font-medium tracking-[0.1em] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>PRÉ-VENDA EXCLUSIVA</span>
            </SoundButton>
          </div>

          {/* Neural Terminal */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-bold tracking-[0.3em] mb-6 text-cyan-400">TERMINAL NEURAL</h2>
            <NeuralTerminal />
          </div>
        </motion.div>

        {/* Main Content - responsivo */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 p-4 md:p-8"
        >
          {/* Category Navigation - responsivo */}
          <div className="flex flex-wrap gap-4 md:space-x-8 mb-8 md:mb-16">
            {categories.map((category) => (
              <SoundButton
                key={category}
                onClick={() => setSelectedCategory(category)}
                soundType="hover"
                className={`pb-2 md:pb-3 text-xs md:text-sm tracking-[0.3em] transition-all duration-300 font-medium relative ${
                  selectedCategory === category ? "text-white" : "text-gray-400 hover:text-white/80"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </SoundButton>
            ))}
          </div>

          {/* Products Grid - responsivo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-gray-900/50 border border-cyan-500/30 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-xl"
                >
                  <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 overflow-hidden relative border-b border-cyan-500/20">
                    {/* Status badge */}
                    <div
                      className={`absolute top-3 md:top-4 left-3 md:left-4 bg-gradient-to-r ${getStatusColor(product.status)} text-black px-2 md:px-3 py-1 rounded-full text-xs font-bold tracking-[0.1em]`}
                    >
                      {product.status}
                    </div>

                    {/* Consciousness level */}
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 text-xs text-cyan-400 border border-cyan-500/30">
                      {product.consciousness_level}% CONSCIENTE
                    </div>

                    {/* Product visualization - simplificado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 backdrop-blur-sm border border-cyan-400/50"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg tracking-[0.2em] mb-3 group-hover:text-cyan-400 transition-all font-medium">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-cyan-400/80 font-medium text-lg">
                        €<PriceCounter targetPrice={product.price} duration={5000} />
                      </p>
                      <div className="text-xs text-gray-500">ID NEURAL: {product.neural_id}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <SoundButton
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        soundType="success"
                        className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 hover:border-cyan-400/50 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium tracking-[0.1em] transition-all duration-300"
                      >
                        ADICIONAR AO CARRINHO NEURAL
                      </SoundButton>

                      <SoundButton
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProductForPreview(product)
                        }}
                        soundType="neural"
                        className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-400/50 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium tracking-[0.1em] transition-all duration-300"
                      >
                        PREVIEW DE ESTILO
                      </SoundButton>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Neural Pagination */}
          <div className="flex justify-center">
            <div className="flex space-x-4 rounded-full bg-black/50 border border-cyan-500/30 p-3 backdrop-blur-xl">
              {Array.from({ length: totalPages }).map((_, index) => (
                <SoundButton
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  soundType="click"
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                      : "bg-cyan-500/20 hover:bg-cyan-500/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/30 border-t border-cyan-500/20 p-4 md:p-6 text-center backdrop-blur-xl">
        <div className="text-xs tracking-[0.4em] text-gray-500 font-light">
          © 2025 DEM CLAIRE — PROTOCOLO DE COMÉRCIO NEURAL v2.1
        </div>
        <div className="mt-2 text-xs text-cyan-400/60">
          SYNC DE CONSCIÊNCIA: {neuralSync.toFixed(1)}% | NODOS NEURAIS: ATIVO | LINKS SINÁPTICOS: ESTÁVEL
        </div>
      </footer>

      {/* Neural Cart */}
      <NeuralCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Style Preview Modal */}
      <StylePreviewModal
        isOpen={!!selectedProductForPreview}
        onClose={() => setSelectedProductForPreview(null)}
        product={selectedProductForPreview}
      />

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={showNewsletterModal} onClose={() => setShowNewsletterModal(false)} type="newsletter" />

      {/* Presale Modal */}
      <NewsletterModal isOpen={showPresaleModal} onClose={() => setShowPresaleModal(false)} type="presale" />

      {/* Floating neural particles - reduzido */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(0, 255, 247, 0.05)" : "rgba(139, 92, 246, 0.05)"
            } 0%, transparent 70%)`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            filter: "blur(20px)",
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}
