"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <CheckCircle2 className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">TaskFlow</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#home"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#app"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Get Started
          </Link>
        </nav>

        <Button asChild size="sm" className="rounded-full">
          <Link href="#app">Get Started</Link>
        </Button>
      </div>
    </motion.header>
  )
}
