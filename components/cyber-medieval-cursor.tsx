"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export default function CyberMedievalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const neuralRef = useRef<HTMLDivElement>(null)
  const clickEffectRef = useRef<HTMLDivElement>(null)
  const textCursorRef = useRef<HTMLDivElement>(null)
  const swordRef = useRef<HTMLDivElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTextInput, setIsTextInput] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Função otimizada para detectar tipo de elemento
  const detectElementType = useCallback((target: HTMLElement) => {
    if (!target) return { isClickable: false, isText: false, isAnchor: false }

    // Detectar elementos clicáveis
    const isClickable =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.classList.contains("clickable") ||
      target.onclick !== null ||
      target.getAttribute("role") === "button" ||
      window.getComputedStyle(target).cursor === "pointer" ||
      target.closest("button") !== null ||
      target.closest("a") !== null

    // Detectar campos de texto
    const isText =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.getAttribute("contenteditable") === "true" ||
      target.closest("input") !== null ||
      target.closest("textarea") !== null

    // Detectar links
    const isAnchor = target.tagName === "A" || target.closest("a") !== null

    return { isClickable, isText, isAnchor }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    // Função principal para atualizar a posição do cursor
    const updateCursorPosition = (e: MouseEvent) => {
      if (!cursorRef.current) return

      // Usar requestAnimationFrame para performance suave
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        if (!cursorRef.current) return

        // Posição base do cursor
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`

        // Detectar o elemento sob o cursor
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement

        if (target) {
          const { isClickable, isText, isAnchor } = detectElementType(target)

          // Atualizar estados apenas se mudaram
          setIsHovering(isClickable)
          setIsTextInput(isText)
          setIsLink(isAnchor)

          // Detectar se está carregando
          const isLoadingElement = target.classList.contains("loading") || target.closest(".loading") !== null
          setIsLoading(isLoadingElement)
        }
      })
    }

    // Manipuladores de eventos otimizados
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)

      if (clickEffectRef.current) {
        clickEffectRef.current.classList.remove("active")
        // Force reflow
        clickEffectRef.current.offsetHeight
        clickEffectRef.current.classList.add("active")

        // Remover classe após animação
        setTimeout(() => {
          if (clickEffectRef.current) {
            clickEffectRef.current.classList.remove("active")
          }
        }, 600)
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Detectar quando o cursor sai da janela
    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Adicionar event listeners
    document.addEventListener("mousemove", updateCursorPosition, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [detectElementType])

  // Efeitos para atualizar classes com base nos estados
  useEffect(() => {
    if (!arrowRef.current || !ornamentRef.current) return

    if (isHovering) {
      arrowRef.current.classList.add("hover")
      ornamentRef.current.classList.add("hover")
    } else {
      arrowRef.current.classList.remove("hover")
      ornamentRef.current.classList.remove("hover")
    }
  }, [isHovering])

  useEffect(() => {
    if (!textCursorRef.current) return

    if (isTextInput) {
      textCursorRef.current.classList.add("active")
    } else {
      textCursorRef.current.classList.remove("active")
    }
  }, [isTextInput])

  useEffect(() => {
    if (!swordRef.current) return

    if (isLink) {
      swordRef.current.classList.add("active")
    } else {
      swordRef.current.classList.remove("active")
    }
  }, [isLink])

  useEffect(() => {
    if (!cursorRef.current) return

    if (isLoading) {
      cursorRef.current.classList.add("cursor-loading")
    } else {
      cursorRef.current.classList.remove("cursor-loading")
    }
  }, [isLoading])

  // Esconder cursor quando não visível
  if (!isVisible) {
    return null
  }

  return (
    <div ref={cursorRef} className="cyber-medieval-cursor">
      {/* Cursor principal (estilo Windows 11) */}
      <div ref={arrowRef} className="cursor-arrow" />

      {/* Ornamento medieval */}
      <div ref={ornamentRef} className="cursor-medieval-ornament" />

      {/* Pulso neural */}
      <div ref={neuralRef} className="cursor-neural-pulse" />

      {/* Efeito de clique */}
      <div ref={clickEffectRef} className="cursor-click-effect" />

      {/* Cursor de texto */}
      <div ref={textCursorRef} className="cursor-text" />

      {/* Cursor de espada para links */}
      <div ref={swordRef} className="cursor-sword" />
    </div>
  )
}
