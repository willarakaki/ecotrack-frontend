"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  isFloat?: boolean
}

export function AnimatedNumber({ value, isFloat = false }: AnimatedNumberProps) {
  // Configuração da animação "mola" (efeito de girar roleta suave)
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  
  // Transforma o valor animado bruto em uma string formatada
  const display = useTransform(spring, (current) => 
    isFloat ? current.toFixed(1) : Math.round(current).toString()
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span>{display}</motion.span>
}
