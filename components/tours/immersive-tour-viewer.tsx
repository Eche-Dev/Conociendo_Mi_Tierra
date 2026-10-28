'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { ImmersiveTour } from '@/lib/data/immersive-tours'
import {
  Compass,
  X,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  Info,
  MousePointer,
} from 'lucide-react'

interface ImmersiveTourViewerProps {
  tour: ImmersiveTour
  isOpen: boolean
  onClose: () => void
}

export function ImmersiveTourViewer({ tour, isOpen, onClose }: ImmersiveTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const totalBeats = tour.beats.length
  const maxProgress = totalBeats - 1

  // Posición del scroll objetivo y posición suave interpolada (lerp)
  const targetProgressRef = useRef(0)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHelp, setShowHelp] = useState(true)

  // Referencias para touch drag
  const touchStartY = useRef(0)

  // Ocultar mensaje de ayuda después de interactuar
  useEffect(() => {
    if (currentProgress > 0.1) {
      setShowHelp(false)
    }
  }, [currentProgress])

  // Prevenir scroll en el body cuando el visor está abierto
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Resetear posición
    targetProgressRef.current = 0
    setCurrentProgress(0)
    setShowHelp(true)

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Loop de animación física suave (lerp)
  useEffect(() => {
    if (!isOpen) return
    let animId: number

    const updatePhysics = () => {
      setCurrentProgress((prev) => {
        const diff = targetProgressRef.current - prev
        if (Math.abs(diff) < 0.001) {
          return targetProgressRef.current
        }
        // Factor de suavizado cinemático
        return prev + diff * 0.085
      })
      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [isOpen])

  // Manejar rueda del ratón (wheel scrub)
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * 0.0018
      targetProgressRef.current = Math.max(0, Math.min(maxProgress, targetProgressRef.current + delta))
    },
    [maxProgress]
  )

  // Manejar teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        targetProgressRef.current = Math.min(maxProgress, Math.round(targetProgressRef.current + 1))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        targetProgressRef.current = Math.max(0, Math.round(targetProgressRef.current - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, maxProgress, onClose])

  // Registrar wheel listener con passive: false para poder hacer preventDefault()
  useEffect(() => {
    if (!isOpen) return
    const node = containerRef.current
    if (!node) return

    node.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      node.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen, handleWheel])

  // Soporte táctil en dispositivos móviles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const deltaY = touchStartY.current - currentY
    touchStartY.current = currentY
    const delta = deltaY * 0.004
    targetProgressRef.current = Math.max(0, Math.min(maxProgress, targetProgressRef.current + delta))
  }

  const jumpToBeat = (index: number) => {
    targetProgressRef.current = index
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  if (!isOpen) return null

  // Índice entero más cercano de la parada actual
  const currentBeatIndex = Math.round(currentProgress)
  const activeBeat = tour.beats[currentBeatIndex] || tour.beats[0]

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="fixed inset-0 z-50 flex flex-col bg-black text-foreground select-none overflow-hidden"
    >
      {/* CAPA DE IMÁGENES: Zoom-through cinemático continuo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {tour.beats.map((beat, index) => {
          // Distancia entre el progreso actual y este beat
          const distance = currentProgress - index

          // Si está demasiado lejos, ocultarlo completamente
          if (distance < -1.1 || distance > 1.2) {
            return null
          }

          // Escala: crece exponencialmente simulando vuelo frontal hacia adentro
          // Cuando estás en el beat (distance = 0) scale = 1.05.
          // Mientras avanzas (distance > 0), hace zoom in hasta 2.3x para "atravesarla".
          // Si vienes llegando (distance < 0), empieza en 0.85x y crece a 1.05x.
          let scale = 1.05
          if (distance >= 0) {
            scale = 1.05 + distance * 1.35
          } else {
            scale = 0.88 + (1 + distance) * 0.17
          }

          // Opacidad con crossfade ultra suave
          let opacity = 0
          if (distance >= -1 && distance <= 0) {
            // Entrando
            opacity = Math.min(1, (1 + distance) * 1.5)
          } else if (distance > 0 && distance <= 1) {
            // Saliendo: se desvanece gradualmente
            opacity = Math.max(0, 1 - Math.pow(distance, 1.8))
          }

          // Desenfoque radial leve al aproximarse mucho (DoF de lente fotográfico)
          const blurAmount = distance > 0.4 ? (distance - 0.4) * 6 : 0

          return (
            <div
              key={beat.id}
              className="absolute inset-0 transition-opacity duration-75 will-change-transform"
              style={{
                opacity,
                zIndex: index,
              }}
            >
              <img
                src={beat.image}
                alt={beat.alt}
                className="w-full h-full object-cover origin-center"
                style={{
                  transform: `scale(${scale.toFixed(4)})`,
                  filter: blurAmount > 0 ? `blur(${blurAmount.toFixed(1)}px)` : 'none',
                  objectPosition: beat.focalPoint || 'center center',
                }}
              />
              {/* Viñeta cinematográfica y gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-background/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
            </div>
          )
        })}
      </div>

      {/* CABECERA SUPERIOR DEL VISOR */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 md:px-10 md:py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/40">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Scroll World · Vuelo Inmersivo
              </span>
              <span className="text-xs text-foreground/40">•</span>
              <span className="text-xs text-foreground/70 font-mono">
                {activeBeat.altitude || 'Perspectiva 3D'}
              </span>
            </div>
            <h1 className="font-display text-xl md:text-2xl uppercase tracking-wider text-foreground">
              {tour.destinationName}
            </h1>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/50 hover:bg-background text-foreground/80 hover:text-foreground transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            title="Cerrar recorrido (Esc)"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 bg-primary/20 hover:bg-primary hover:text-background text-primary font-bold transition-all shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* CONTENIDO CENTRAL: NARRATIVE BEATS FLOTANTES */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-16 pointer-events-none">
        <div className="max-w-2xl">
          {tour.beats.map((beat, index) => {
            const distance = Math.abs(currentProgress - index)
            // Solo renderizar el texto si estamos razonablemente cerca de este beat
            if (distance > 0.6) return null

            // Opacidad y traslación vertical del texto según la cercanía exacta
            const textOpacity = Math.max(0, 1 - distance * 1.8)
            const translateY = (currentProgress - index) * 24

            return (
              <div
                key={beat.id}
                className="transition-all duration-100 ease-out will-change-transform pointer-events-auto"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {/* Eyebrow de la escena */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-mono text-primary backdrop-blur-md mb-3 shadow-md">
                  <span>Hito {index + 1} de {totalBeats}</span>
                  <span>·</span>
                  <span>{beat.subtitle}</span>
                </div>

                {/* Título gigante cinemático */}
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground drop-shadow-md leading-[0.95]">
                  {beat.title}
                </h2>

                {/* Narrativa poética descriptiva */}
                <p className="mt-3 text-base sm:text-lg font-serif text-foreground/90 leading-relaxed max-w-xl drop-shadow">
                  {beat.description}
                </p>

                {/* Dato destacado */}
                {beat.fact && (
                  <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-foreground/15 bg-card/60 px-4 py-2 backdrop-blur-md">
                    <Info className="h-4 w-4 text-primary shrink-0" />
                    <div className="text-xs">
                      <span className="text-muted-foreground uppercase font-mono mr-2">
                        {beat.fact.label}:
                      </span>
                      <strong className="text-primary font-bold">{beat.fact.value}</strong>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* GUÍA FLOTANTE INICIAL: "Gira la rueda del ratón" */}
      {showHelp && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-3 text-center bg-background/80 border border-primary/40 rounded-2xl p-6 backdrop-blur-md shadow-2xl animate-bounce">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
            <MousePointer className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-lg uppercase tracking-wider text-primary">
              Gira la rueda del ratón
            </p>
            <p className="text-xs text-foreground/80 mt-1 max-w-xs font-serif">
              Avanza hacia adelante para adentrarte en el paisaje y volar entre imágenes.
            </p>
          </div>
        </div>
      )}

      {/* BARRA INFERIOR DE PROGRESO Y CONTROLES */}
      <footer className="relative z-20 px-6 py-4 md:px-10 md:py-6 bg-gradient-to-t from-background via-background/70 to-transparent flex items-center justify-between gap-4">
        {/* Indicador de destino activo */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            {tour.destinationName}
          </span>
          <span className="text-xs text-foreground/40">•</span>
          <span className="text-xs text-foreground/70 font-mono">
            {activeBeat.title}
          </span>
        </div>

        {/* Botones de navegación paso a paso y barra de progreso */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-foreground/20 rounded-full bg-background/50 p-1">
            <button
              onClick={() =>
                (targetProgressRef.current = Math.max(0, targetProgressRef.current - 1))
              }
              disabled={currentProgress <= 0.05}
              title="Anterior (Flecha Arriba)"
              className="p-1.5 rounded-full hover:bg-foreground/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-foreground/80"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <div className="px-2 text-xs font-mono text-primary font-bold">
              {Math.min(totalBeats, Math.floor(currentProgress) + 1)} / {totalBeats}
            </div>
            <button
              onClick={() =>
                (targetProgressRef.current = Math.min(maxProgress, targetProgressRef.current + 1))
              }
              disabled={currentProgress >= maxProgress - 0.05}
              title="Siguiente (Flecha Abajo)"
              className="p-1.5 rounded-full hover:bg-foreground/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-foreground/80"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Barra de progreso global */}
          <div className="w-24 sm:w-36 h-1.5 bg-foreground/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-75 ease-out"
              style={{
                width: `${((currentProgress / maxProgress) * 100).toFixed(1)}%`,
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
