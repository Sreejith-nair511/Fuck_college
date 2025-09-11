"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Navigation } from "./Navigation"
import { PageTransition } from "./PageTransition"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          />
        </div>
        <div className="absolute inset-0 bg-[url('/subtle-grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative backdrop-blur-2xl bg-white/5 border-b border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-800/60 via-red-900/70 to-orange-800/60" />
        <div className="absolute inset-0 bg-[url('/railway-track-pattern.jpg')] opacity-10" />

        <div className="relative container mx-auto px-4 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-balance leading-tight drop-shadow-lg"
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-red-100 mt-1 text-sm lg:text-base drop-shadow-md"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            <Navigation />
          </div>
        </div>
      </motion.header>

      {/* Main Content with Page Transitions */}
      <main className="relative">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
