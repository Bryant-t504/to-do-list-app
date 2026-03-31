"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

const footerLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Contact" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="border-t border-border/30 py-16 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-96 rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/10"
              >
                <CheckCircle2 className="size-5 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                TaskFlow
              </span>
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground text-center"
          >
            Built with care for modern productivity.
          </motion.p>

          <div className="flex items-center gap-6">
            {footerLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground relative group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/30 text-center"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
