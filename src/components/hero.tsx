import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { lazy, Suspense } from "react"

const Hero3DScene = lazy(() => import("@/components/hero-3d-scene").then(m => ({ default: m.Hero3DScene })))

const letterAnimation = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
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
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />}>
        <Hero3DScene />
      </Suspense>

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
              <a href="#app">
                Get Started Free
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight className="size-4" />
                </motion.span>
              </a>
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
              <a href="#features">See How It Works</a>
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
              className="flex flex-col items-center"
            >
              <span className="text-3xl font-bold text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
