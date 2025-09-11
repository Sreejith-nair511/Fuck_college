"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Train } from "@/lib/mockData"
import { priorityLabels, coachLabels } from "@/lib/mockData"
import { ChevronDown, ChevronUp, Zap, Clock, Route, Gauge, TrainIcon, Star } from "lucide-react"

interface TrainListProps {
  trains: Train[]
}

interface TrainCardProps {
  train: Train
  index: number
}

function TrainCard({ train, index }: TrainCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-300"
      case 2:
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-300"
      case 3:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-300"
      case 4:
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-300"
      case 5:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300"
    }
  }

  const getTrainTypeColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "border-l-red-500"
      case 2:
        return "border-l-orange-500"
      case 3:
        return "border-l-yellow-500"
      case 4:
        return "border-l-blue-500"
      case 5:
        return "border-l-gray-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getDelayColor = (delay: number) => {
    if (delay === 0) return "text-green-600"
    if (delay <= 5) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrainImage = (priority: number, engine: string) => {
    const baseQuery = `${engine} locomotive train engine`
    if (priority === 1)
      return `/placeholder.svg?height=120&width=200&query=premium red Rajdhani Express train with ${engine} engine`
    if (priority === 2)
      return `/placeholder.svg?height=120&width=200&query=blue express passenger train with ${engine} engine`
    if (priority === 4)
      return `/placeholder.svg?height=120&width=200&query=local MEMU passenger train with ${engine} engine`
    if (priority === 5)
      return `/placeholder.svg?height=120&width=200&query=freight goods train with ${engine} locomotive pulling cargo wagons`
    return `/placeholder.svg?height=120&width=200&query=Indian Railways train with ${engine} engine`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      <Card
        className={`relative overflow-hidden border-l-4 ${getTrainTypeColor(train.priority)} bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group-hover:bg-white border border-white/50`}
      >
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/10 pointer-events-none" />

        <div className="relative h-32 overflow-hidden bg-gradient-to-r from-gray-100 to-blue-50">
          <img
            src={getTrainImage(train.priority, train.engine) || "/placeholder.svg"}
            alt={`${train.name} locomotive`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Priority badge overlay */}
          <motion.div
            className="absolute top-3 right-3"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Badge className={`text-xs shadow-lg backdrop-blur-sm ${getPriorityColor(train.priority)}`}>
              {train.priority === 1 && <Star className="w-3 h-3 mr-1" />}
              Priority {train.priority}
            </Badge>
          </motion.div>

          {/* Train number badge */}
          <motion.div
            className="absolute top-3 left-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Badge
              variant="outline"
              className="font-mono text-sm bg-white/90 backdrop-blur-sm border-white/50 shadow-lg"
            >
              {train.number}
            </Badge>
          </motion.div>
        </div>

        <CardHeader className="relative pb-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800 text-balance flex items-center gap-2">
                <TrainIcon className="h-5 w-5 text-blue-600" />
                {train.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{priorityLabels[train.priority]}</p>
            </div>
            <motion.div className="text-left sm:text-right" whileHover={{ scale: 1.05 }}>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <Clock className="h-4 w-4" />
                <span className={`font-medium ${getDelayColor(train.currentDelay || 0)}`}>
                  {train.currentDelay ? `+${train.currentDelay}m` : "On Time"}
                </span>
              </div>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {[
              {
                icon: Zap,
                label: "Engine",
                value: train.engine,
                color: "text-blue-600",
                bg: "from-blue-50 to-blue-100",
              },
              {
                icon: Gauge,
                label: "Max Speed",
                value: `${train.maxSpeed} km/h`,
                color: "text-green-600",
                bg: "from-green-50 to-green-100",
              },
              {
                icon: Route,
                label: "Length",
                value: `${train.length}m`,
                color: "text-purple-600",
                bg: "from-purple-50 to-purple-100",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-3 text-sm p-3 rounded-xl bg-gradient-to-br ${item.bg} border border-white/50 hover:shadow-md transition-all duration-200`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className={`p-2 rounded-lg bg-white/80 ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-medium">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <p className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
              <Route className="h-4 w-4" />
              Route Journey
            </p>
            <div className="relative p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200 shadow-inner">
              <div className="flex items-center gap-2 flex-wrap">
                {train.route.map((station, stationIndex) => (
                  <motion.div
                    key={station}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 + stationIndex * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border border-blue-200"
                    >
                      {station}
                    </Badge>
                    {stationIndex < train.route.length - 1 && (
                      <motion.div
                        className="flex items-center gap-1"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 + stationIndex * 0.1 }}
                      >
                        <div className="w-3 sm:w-4 h-px bg-gradient-to-r from-blue-400 to-indigo-400" />
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        <div className="w-3 sm:w-4 h-px bg-gradient-to-r from-indigo-400 to-purple-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto hover:bg-blue-50 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm"
                >
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TrainIcon className="h-4 w-4" />
                    Coach Composition
                  </span>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </motion.div>
                </Button>
              </motion.div>
            </CollapsibleTrigger>
            <AnimatePresence>
              {isExpanded && (
                <CollapsibleContent forceMount>
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-3"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(train.coaches).map(([coachType, count], coachIndex) => (
                          <motion.div
                            key={coachType}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: coachIndex * 0.05 }}
                            className="flex justify-between items-center text-sm py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <span className="text-gray-600 font-medium">{coachLabels[coachType] || coachType}:</span>
                            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                              {count}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 pt-3 border-t border-gray-200"
                      >
                        <div className="flex justify-between items-center text-sm bg-white rounded-lg p-3 shadow-sm">
                          <span className="font-medium text-gray-700">Total Coaches:</span>
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                            {Object.values(train.coaches).reduce((sum, count) => sum + count, 0)}
                          </Badge>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </CollapsibleContent>
              )}
            </AnimatePresence>
          </Collapsible>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function TrainList({ trains }: TrainListProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="shadow-2xl bg-white/85 backdrop-blur-xl border border-white/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
          <div className="absolute inset-0 bg-[url('/subtle-railway-track-pattern.jpg')] opacity-10" />
          <CardTitle className="relative flex items-center gap-3 text-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
            >
              <Route className="h-5 w-5" />
            </motion.div>
            <div>
              <span className="text-xl font-bold">Active Trains</span>
              <Badge className="ml-3 bg-white/20 text-white border-white/30">{trains.length} Running</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 bg-gradient-to-br from-white/95 via-blue-50/30 to-indigo-50/50">
          <div className="space-y-6">
            {trains.map((train, index) => (
              <TrainCard key={train.id} train={train} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
