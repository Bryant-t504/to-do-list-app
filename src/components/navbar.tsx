import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { Link } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#app", label: "Get Started" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.8)"]
  )
  
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.4])
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-border"
      />
      
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20"
            >
              <CheckCircle2 className="size-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
              TaskFlow
            </span>
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <a
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
              >
                {item.label}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-foreground origin-left"
                />
              </a>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            asChild 
            size="sm" 
            className={`rounded-full px-6 shadow-lg transition-all duration-300 ${
              isScrolled 
                ? "shadow-primary/20 hover:shadow-primary/30" 
                : "shadow-transparent"
            }`}
          >
            <a href="#app">Get Started</a>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
