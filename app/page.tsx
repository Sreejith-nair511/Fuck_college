"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { trains, networkSections, stations, type OptimizationResult } from "@/lib/mockData"
import { optimizeSchedule, type OptimizationMode } from "@/lib/aiOptimizer"
import { NetworkOverview } from "@/components/NetworkOverview"
import { TrainList } from "@/components/TrainList"
import { RecommendationsPanel } from "@/components/RecommendationsPanel"
import { StartupAnimation } from "@/components/StartupAnimation"
import { PageLayout } from "@/components/PageLayout"

export default function DashboardPage() {
  const [showStartup, setShowStartup] = useState(true)
  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>("Heuristic")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)

  const handleOptimize = async () => {
    setIsOptimizing(true)
    try {
      const result = await optimizeSchedule(trains, optimizationMode)
      setOptimizationResult(result)
    } catch (error) {
      console.error("Optimization failed:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <>
      <AnimatePresence>{showStartup && <StartupAnimation onComplete={() => setShowStartup(false)} />}</AnimatePresence>

      {!showStartup && (
        <PageLayout
          title="Indian Railways — AI Traffic Control Dashboard"
          subtitle="Real-time Network Monitoring & Optimization"
        >
          <div className="container mx-auto px-4 py-4 lg:py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 backdrop-blur-xl bg-white/5 rounded-2xl p-4 lg:p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <label className="text-sm font-medium text-white drop-shadow-md whitespace-nowrap">
                      Optimization Mode:
                    </label>
                    <Select
                      value={optimizationMode}
                      onValueChange={(value) => setOptimizationMode(value as OptimizationMode)}
                    >
                      <SelectTrigger className="w-full sm:w-40 bg-white/95 backdrop-blur-sm text-gray-900 border-white/50 shadow-lg hover:bg-white transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl border-white/50">
                        <SelectItem value="Heuristic">Heuristic</SelectItem>
                        <SelectItem value="Simulated AI">Simulated AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleOptimize}
                      disabled={isOptimizing}
                      className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-2 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {isOptimizing ? "Optimizing..." : "Run Optimize"}
                    </Button>
                  </motion.div>
                </div>

                {optimizationResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/20 shadow-lg"
                  >
                    <span className="text-sm text-white font-medium">Throughput Score:</span>
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-lg px-3 py-1 shadow-lg">
                      {optimizationResult.throughputScore}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6"
            >
              <div className="xl:col-span-2 space-y-4 lg:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <NetworkOverview sections={networkSections} stations={stations} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <TrainList trains={trains} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="xl:col-span-1"
              >
                <RecommendationsPanel result={optimizationResult} isOptimizing={isOptimizing} />
              </motion.div>
            </motion.div>
          </div>
        </PageLayout>
      )}
    </>
  )
}
