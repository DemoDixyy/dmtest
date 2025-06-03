"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Share2, ShoppingCart, Zap, Star } from "lucide-react"
import PriceCounter from "@/components/price-counter"
import SoundButton from "@/components/sound-button"
import BrainWave from "@/components/brain-wave"

interface Product {
  id: number
  name: string
  price: number
  status: string
  consciousness_level: number
  neural_id: string
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  features: string[]
  materials: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Jaqueta Neural",
    price: 520,
    status: "SYNCED",
    consciousness_level: 94,
    neural_id: "NJ001",
    category: "NEURAL",
    description:
      "Jaqueta com interface neural integrada que se adapta ao seu estado de consciência. Tecnologia de fibras inteligentes que respondem aos impulsos neurais.",
    images: [
      "/placeholder.svg?height=600&width=500&text=Jaqueta+Neural+Frente",
      "/placeholder.svg?height=600&width=500&text=Jaqueta+Neural+Costas",
      "/placeholder.svg?height=600&width=500&text=Jaqueta+Neural+Detalhe",
      "/placeholder.svg?height=600&width=500&text=Jaqueta+Neural+Interior",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Neural Black", "Cyber Blue", "Quantum Purple"],
    features: [
      "Interface neural integrada",
      "Fibras que respondem a impulsos",
      "Regulação térmica automática",
      "Conectividade wireless",
      "Bateria de 72h",
    ],
    materials: ["65% Fibra Neural", "25% Algodão Orgânico", "10% Elastano Quântico"],
  },
  {
    id: 2,
    name: "Moletom Sináptico",
    price: 380,
    status: "ACTIVE",
    consciousness_level: 87,
    neural_id: "SH002",
    category: "SYNAPTIC",
    description:
      "Moletom com conexões sinápticas que amplificam sua energia neural. Design ergonômico para máximo conforto durante sessões de sincronização.",
    images: [
      "/placeholder.svg?height=600&width=500&text=Moletom+Sináptico+Frente",
      "/placeholder.svg?height=600&width=500&text=Moletom+Sináptico+Costas",
      "/placeholder.svg?height=600&width=500&text=Moletom+Sináptico+Capuz",
      "/placeholder.svg?height=600&width=500&text=Moletom+Sináptico+Bolso",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Synaptic Gray", "Neural White", "Quantum Black"],
    features: [
      "Conexões sinápticas ativas",
      "Capuz com isolamento neural",
      "Bolso frontal com carregador",
      "Tecido anti-estático",
      "Costura reforçada",
    ],
    materials: ["70% Algodão Neural", "20% Poliéster Quântico", "10% Fibra Sináptica"],
  },
  // Adicionar mais produtos conforme necessário
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [neuralActivity, setNeuralActivity] = useState(1.2)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
    }
  }, [product])

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity((prev) => Math.max(0.8, Math.min(2, prev + (Math.random() - 0.5) * 0.3)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-cyan-400 mb-4">PRODUTO NÃO ENCONTRADO</div>
          <SoundButton
            onClick={() => router.push("/home")}
            soundType="click"
            className="text-cyan-400 hover:text-white transition-colors"
          >
            Voltar ao Catálogo Neural
          </SoundButton>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Selecione um tamanho")
      return
    }
    // Lógica para adicionar ao carrinho
    console.log("Adicionado ao carrinho:", {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-black/90 to-gray-900/90 border-b border-cyan-500/20 px-4 md:px-8 py-4 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <SoundButton
            onClick={() => router.push("/home")}
            soundType="click"
            className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Catálogo</span>
          </SoundButton>

          <div className="flex items-center space-x-4">
            <div className="text-xs text-cyan-400/60">NEURAL SYNC</div>
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                animate={{ width: `${neuralActivity * 50}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-6">
            {/* Imagem Principal */}
            <motion.div
              className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-cyan-500/30 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {product.status}
              </div>

              {/* Consciousness Level */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-cyan-400 border border-cyan-500/30">
                {product.consciousness_level}% CONSCIENTE
              </div>

              {/* Neural Activity Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                  <div className="text-xs text-cyan-400 mb-2">ATIVIDADE NEURAL</div>
                  <BrainWave intensity={neuralActivity} className="h-8" />
                </div>
              </div>
            </motion.div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <SoundButton
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  soundType="hover"
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-cyan-400 shadow-[0_0_15px_rgba(0,255,247,0.5)]"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SoundButton>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-8">
            {/* Cabeçalho do Produto */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-cyan-400/60 tracking-[0.2em]">ID NEURAL: {product.neural_id}</div>
                <div className="flex items-center space-x-3">
                  <SoundButton
                    onClick={() => setIsLiked(!isLiked)}
                    soundType="neural"
                    className={`p-2 rounded-full border transition-all duration-300 ${
                      isLiked
                        ? "border-red-400 text-red-400 bg-red-400/10"
                        : "border-gray-600 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  </SoundButton>
                  <SoundButton
                    onClick={() => {}}
                    soundType="click"
                    className="p-2 rounded-full border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </SoundButton>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4 text-white">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-cyan-400">
                  €<PriceCounter targetPrice={product.price} duration={3000} />
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">(127 avaliações)</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">{product.description}</p>
            </div>

            {/* Seleção de Cor */}
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-[0.2em]">COR NEURAL</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <SoundButton
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    soundType="hover"
                    className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${
                      selectedColor === color
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                        : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
                    }`}
                  >
                    {color}
                  </SoundButton>
                ))}
              </div>
            </div>

            {/* Seleção de Tamanho */}
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-[0.2em]">TAMANHO</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <SoundButton
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    soundType="hover"
                    className={`py-3 rounded-xl border transition-all duration-300 text-center font-bold ${
                      selectedSize === size
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                        : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
                    }`}
                  >
                    {size}
                  </SoundButton>
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-[0.2em]">QUANTIDADE</h3>
              <div className="flex items-center space-x-4">
                <SoundButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  soundType="click"
                  className="w-12 h-12 rounded-xl border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  -
                </SoundButton>
                <div className="w-16 h-12 rounded-xl border border-gray-600 flex items-center justify-center text-white font-bold">
                  {quantity}
                </div>
                <SoundButton
                  onClick={() => setQuantity(quantity + 1)}
                  soundType="click"
                  className="w-12 h-12 rounded-xl border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  +
                </SoundButton>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <SoundButton
                onClick={handleAddToCart}
                soundType="success"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-4 rounded-xl text-white font-bold tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADICIONAR AO CARRINHO NEURAL</span>
              </SoundButton>

              <SoundButton
                onClick={() => {}}
                soundType="neural"
                className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-400/50 py-4 rounded-xl text-white font-bold tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>COMPRA NEURAL INSTANTÂNEA</span>
              </SoundButton>
            </div>

            {/* Características */}
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-[0.2em]">CARACTERÍSTICAS NEURAIS</h3>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materiais */}
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-[0.2em]">COMPOSIÇÃO NEURAL</h3>
              <div className="space-y-2">
                {product.materials.map((material, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-gray-300">{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
