import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { CheckCircle2, Zap, Shield, Sparkles } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    icon: CheckCircle2,
    title: "Intuitive Task Management",
    description:
      "Create, organize, and complete tasks with a clean, distraction-free interface designed for focus.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant updates and smooth animations make managing your tasks feel effortless and responsive.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays on your device. No accounts, no tracking, just pure productivity.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Sparkles,
    title: "Beautiful Design",
    description:
      "A premium, modern interface that makes productivity a pleasure, not a chore.",
    gradient: "from-pink-500 to-rose-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rotateX = useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm h-full"
      >
        {/* Icon with gradient background */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.3 + index * 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 200
          }}
          className={`mb-6 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
          style={{ transform: "translateZ(20px)" }}
        >
          <feature.icon className="size-7 text-background" />
        </motion.div>
        
        <motion.h3 
          className="mb-3 text-xl font-semibold text-foreground"
          style={{ transform: "translateZ(15px)" }}
        >
          {feature.title}
        </motion.h3>
        <motion.p 
          className="text-sm leading-relaxed text-muted-foreground"
          style={{ transform: "translateZ(10px)" }}
        >
          {feature.description}
        </motion.p>
        
        {/* Hover gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5`}
        />
        
        {/* Shine effect */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 0.1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-foreground to-transparent skew-x-12"
        />

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-sm`} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-20 size-96 rounded-full bg-accent/10 blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-20 size-96 rounded-full bg-accent/10 blur-[100px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
          >
            Features
          </motion.span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything you need to stay{" "}
            <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
              productive
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
            Built with modern design principles and powerful features that help you
            accomplish more, faster.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
