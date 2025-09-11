"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import type { OptimizationResult } from "@/lib/mockData"
import { Brain, CheckCircle, Clock, AlertTriangle, TrendingUp, Zap, Target, Activity } from "lucide-react"

interface RecommendationsPanelProps {
  result: OptimizationResult | null
  isOptimizing: boolean
}

export function RecommendationsPanel({ result, isOptimizing }: RecommendationsPanelProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "PROCEED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "HOLD_5_MIN":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "PRIORITY_CLEARANCE":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "PROCEED":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-300"
      case "HOLD_5_MIN":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-300"
      case "PRIORITY_CLEARANCE":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-300"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300"
    }
  }

  const getActionBgColor = (action: string) => {
    switch (action) {
      case "PROCEED":
        return "from-green-50 to-emerald-50 border-green-200"
      case "HOLD_5_MIN":
        return "from-yellow-50 to-amber-50 border-yellow-200"
      case "PRIORITY_CLEARANCE":
        return "from-red-50 to-rose-50 border-red-200"
      default:
        return "from-gray-50 to-slate-50 border-gray-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-fit xl:sticky xl:top-6"
    >
      <Card className="shadow-2xl bg-white/90 backdrop-blur-xl border border-white/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-teal-600/30" />
          <div className="absolute inset-0 bg-[url('/subtle-circuit-pattern.jpg')] opacity-10" />
          <CardTitle className="relative flex items-center gap-3 text-lg">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
            >
              <Brain className="h-5 w-5" />
            </motion.div>
            <div>
              <span className="text-xl font-bold">AI Recommendations</span>
              <div className="text-sm text-green-100 font-normal">Intelligent Traffic Control</div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 lg:p-6 bg-gradient-to-br from-white/95 via-green-50/30 to-teal-50/50">
          <AnimatePresence mode="wait">
            {isOptimizing ? (
              <motion.div
                key="optimizing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-sm text-gray-600 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"
                  />
                  <span className="font-medium">Processing AI optimization...</span>
                </div>

                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2 p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30"
                    >
                      <Skeleton className="h-4 w-3/4 bg-gray-200/60" />
                      <Skeleton className="h-3 w-1/2 bg-gray-200/40" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200 shadow-inner"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="p-2 bg-blue-500 rounded-full"
                    >
                      <TrendingUp className="h-5 w-5 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-blue-900 text-lg">Section Throughput</h3>
                  </div>

                  <div className="flex items-end gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="text-4xl font-bold text-blue-900"
                    >
                      {result.throughputScore}
                      <span className="text-lg font-normal text-blue-600 ml-1">/ 100</span>
                    </motion.div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-sm text-blue-700">
                        <span>Efficiency</span>
                        <span>{result.throughputScore}%</span>
                      </div>
                      <Progress value={result.throughputScore} className="h-2 bg-blue-200" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Target className="h-4 w-4" />
                      <span>Optimal Range: 85-95</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Activity className="h-4 w-4" />
                      <span>
                        Status:{" "}
                        {result.throughputScore >= 85
                          ? "Excellent"
                          : result.throughputScore >= 70
                            ? "Good"
                            : "Needs Optimization"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-bold text-gray-800 text-lg">Train Actions</h3>
                    <Badge className="bg-gray-100 text-gray-700 text-xs">{result.recommendations.length} Actions</Badge>
                  </div>

                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.trainId}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className={`border rounded-xl p-4 bg-gradient-to-br ${getActionBgColor(rec.action)} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm leading-relaxed mb-2">
                              {rec.trainName}
                            </h4>
                            <div className="flex items-center gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                                {getActionIcon(rec.action)}
                              </motion.div>
                              <Badge className={`text-xs shadow-lg ${getActionColor(rec.action)}`}>
                                {rec.action.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="text-right"
                          >
                            <div className="text-xs text-gray-600 mb-1">AI Score</div>
                            <div className="text-lg font-bold text-gray-800">{rec.trainScore}</div>
                          </motion.div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">Expected Impact:</span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                            className={`font-semibold ${rec.expectedDelay > 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {rec.expectedDelay > 0 ? `+${rec.expectedDelay}m delay` : "On Schedule"}
                          </motion.span>
                        </div>

                        {/* Progress indicator for action urgency */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Action Priority</span>
                            <span>
                              {rec.action === "PRIORITY_CLEARANCE"
                                ? "High"
                                : rec.action === "HOLD_5_MIN"
                                  ? "Medium"
                                  : "Normal"}
                            </span>
                          </div>
                          <Progress
                            value={rec.action === "PRIORITY_CLEARANCE" ? 90 : rec.action === "HOLD_5_MIN" ? 60 : 30}
                            className="h-1.5"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="mx-auto mb-4 p-4 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full w-fit"
                >
                  <Brain className="h-12 w-12 text-gray-400" />
                </motion.div>
                <p className="text-sm text-gray-500 text-balance font-medium">
                  Click "Run Optimize" to generate intelligent AI recommendations
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Advanced algorithms will analyze train priorities and section capacity
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
