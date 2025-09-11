"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Train, Map, BarChart3, Settings, Menu, X, Home, Camera, Route } from "lucide-react"

const navigationItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/network", label: "Network Map", icon: Map },
  { href: "/trains", label: "Train Fleet", icon: Train },
  { href: "/gallery", label: "Train Gallery", icon: Camera },
  { href: "/routes", label: "Route Planner", icon: Route },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 relative
                  ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                      : "text-red-100 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation Button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                          ${
                            isActive
                              ? "bg-white/20 text-white shadow-lg border border-white/30"
                              : "text-red-100 hover:bg-white/10 hover:text-white"
                          }
                        `}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
