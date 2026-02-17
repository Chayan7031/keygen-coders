"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  className?: string
  squaresClassName?: string
}

export function InteractiveGridPattern({
  width = 60,
  height = 60,
  squares = [20, 20],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const [randomSquares, setRandomSquares] = useState<number[]>([])

  const totalSquares = horizontal * vertical;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndices = Array.from({ length: 4 }, () => 
        Math.floor(Math.random() * totalSquares)
      );
      setRandomSquares(randomIndices);
      
      setTimeout(() => setRandomSquares([]), 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, [totalSquares]);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: totalSquares }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height

        const isGlowing = hoveredSquare === index || randomSquares.includes(index);

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-zinc-500/10 transition-all duration-700 ease-in-out",
              isGlowing ? "fill-green-500/20 stroke-green-500/30" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}