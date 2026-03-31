"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Zap, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Intuitive Task Management",
    description:
      "Create, organize, and complete tasks with a clean, distraction-free interface designed for focus.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant updates and smooth animations make managing your tasks feel effortless and responsive.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays on your device. No accounts, no tracking, just pure productivity.",
  },
  {
    icon: Sparkles,
    title: "Beautiful Design",
    description:
      "A premium, modern interface that makes productivity a pleasure, not a chore.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to stay productive
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Built with modern design principles and powerful features that help you
            accomplish more, faster.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary">
                <feature.icon className="size-6 text-foreground" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
