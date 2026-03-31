"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Hero3DScene = dynamic(
  () => import("@/components/hero-3d-scene").then((mod) => mod.Hero3DScene),
  { ssr: false }
)

const letterAnimation = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.15,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              custom={wordIndex * 10 + charIndex}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Tasks Completed" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* 3D Background Scene */}
      <Hero3DScene />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none z-[1]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-5 py-2 text-sm text-muted-foreground backdrop-blur-xl shadow-lg shadow-accent/5"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Sparkles className="size-4 text-accent" />
          </motion.span>
          <span className="font-medium">Now with smart task suggestions</span>
        </motion.div>

        {/* Animated Title */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          <AnimatedTitle text="Organize Your Life," />
          <br />
          <span className="bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
            <AnimatedTitle text="Effortlessly" />
          </span>
        </h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          A beautifully designed task manager that helps you focus on what matters.
          Simple, powerful, and built for modern productivity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild size="lg" className="group rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
              <Link href="#app">
                Get Started Free
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight className="size-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-border transition-all duration-300"
            >
              <Link href="#features">See How It Works</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border/30 pt-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              custom={index}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-center group cursor-default"
            >
              <motion.div 
                className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="mt-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-border/50 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-muted-foreground"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
