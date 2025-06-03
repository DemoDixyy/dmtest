"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingCart, Zap, Brain } from "lucide-react"
import UltraFastCheckout from "./ultra-fast-checkout"
import PriceCounter from "./price-counter"
import SoundButton from "./sound-button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  consciousness_level: number
  neural_id: string
  status: string
  image?: string
}

interface NeuralCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export default function NeuralCart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: NeuralCartProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [neuralSync, setNeuralSync] = useState(87.3)
  const [showUltraCheckout, setShowUltraCheckout] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralSync((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(75, Math.min(99.9, prev + change))
      })
    }, 5000) // Reduzido para 5 segundos

    return () => clearInterval(interval)
  }, [])

  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const avgConsciousness = useMemo(
    () => (items.length > 0 ? items.reduce((sum, item) => sum + item.consciousness_level, 0) / items.length : 0),
    [items],
  )

  const handleCheckout = useCallback(async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    alert("Transação neural processada! Sincronização de consciência completa.")
    setIsProcessing(false)
    onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Cart Panel - responsivo */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm md:max-w-lg bg-black/95 backdrop-blur-xl border-l border-cyan-500/30 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-cyan-500/20 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2
                      className="text-lg md:text-xl font-bold text-cyan-400 tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      CARRINHO NEURAL
                    </h2>
                    <div className="text-xs text-cyan-400/60">COMÉRCIO DE CONSCIÊNCIA</div>
                  </div>
                </div>
                <SoundButton
                  onClick={onClose}
                  soundType="click"
                  className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </SoundButton>
              </div>

              {/* Neural Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                <div className="bg-gray-900/50 rounded-xl p-2 md:p-3 border border-cyan-500/20">
                  <div className="text-xs text-cyan-400/60 mb-1">ITENS</div>
                  <div className="text-sm md:text-lg font-bold text-white">{totalItems}</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-2 md:p-3 border border-cyan-500/20">
                  <div className="text-xs text-cyan-400/60 mb-1">SYNC</div>
                  <div className="text-sm md:text-lg font-bold text-cyan-400">{neuralSync.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-2 md:p-3 border border-cyan-500/20">
                  <div className="text-xs text-cyan-400/60 mb-1">CONSCIÊNCIA</div>
                  <div className="text-sm md:text-lg font-bold text-purple-400">{avgConsciousness.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-base md:text-lg">Carrinho neural vazio</p>
                  <p className="text-gray-600 text-sm">Adicione alguns produtos dirigidos pela consciência</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-900/50 rounded-xl p-3 md:p-4 border border-cyan-500/20"
                  >
                    <div className="flex items-start space-x-3 md:space-x-4">
                      {/* Product Image */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base text-white font-medium mb-1 truncate">{item.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                            {item.status}
                          </span>
                          <span className="text-xs text-gray-400">{item.consciousness_level}% Consciente</span>
                        </div>
                        <div className="text-cyan-400 font-bold text-sm md:text-base">
                          <PriceCounter targetPrice={item.price} duration={3000} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">ID Neural: {item.neural_id}</div>
                      </div>

                      {/* Remove Button */}
                      <SoundButton
                        onClick={() => onRemoveItem(item.id)}
                        soundType="click"
                        className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors flex-shrink-0"
                      >
                        <X className="w-3 h-3 text-red-400" />
                      </SoundButton>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <SoundButton
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          soundType="click"
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-400" />
                        </SoundButton>
                        <span className="text-white font-medium w-6 md:w-8 text-center text-sm md:text-base">
                          {item.quantity}
                        </span>
                        <SoundButton
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          soundType="click"
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-400" />
                        </SoundButton>
                      </div>
                      <div className="text-white font-bold text-sm md:text-base">
                        <PriceCounter targetPrice={item.price * item.quantity} duration={2500} />
                      </div>
                    </div>

                    {/* Neural Sync Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Compatibilidade Neural</span>
                        <span>{item.consciousness_level}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.consciousness_level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-cyan-500/20 bg-gray-900/30 flex-shrink-0">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg text-gray-300">Valor Total Neural:</span>
                  <span className="text-xl md:text-2xl font-bold text-cyan-400">
                    <PriceCounter targetPrice={totalPrice} duration={4000} />
                  </span>
                </div>

                {/* Consciousness Compatibility */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Compatibilidade de Consciência</span>
                    <span>{avgConsciousness.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      animate={{ width: `${avgConsciousness}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3">
                  <SoundButton
                    onClick={() => setShowUltraCheckout(true)}
                    soundType="success"
                    className="w-full py-3 md:py-4 rounded-xl font-bold tracking-[0.1em] transition-all duration-300 bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400 text-sm md:text-base"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    CHECKOUT ULTRA-RÁPIDO
                  </SoundButton>

                  <SoundButton
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    soundType="neural"
                    className={`w-full py-2 md:py-3 rounded-xl font-medium tracking-[0.1em] transition-all duration-300 text-sm md:text-base ${
                      isProcessing
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-800 text-white hover:bg-gray-700 border border-cyan-500/30"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 md:w-5 md:h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                        />
                        <span>PROCESSANDO TRANSAÇÃO NEURAL...</span>
                      </div>
                    ) : (
                      "CHECKOUT TRADICIONAL"
                    )}
                  </SoundButton>
                </div>

                <div className="text-xs text-center text-gray-500 mt-2">
                  Criptografia neural segura • Consciência verificada
                </div>
              </div>
            )}
          </motion.div>

          {/* Ultra Fast Checkout */}
          <UltraFastCheckout
            isOpen={showUltraCheckout}
            onClose={() => setShowUltraCheckout(false)}
            items={items}
            total={totalPrice}
          />
        </>
      )}
    </AnimatePresence>
  )
}
