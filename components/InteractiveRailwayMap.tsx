"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { networkSections, stations, trains } from "@/lib/mockData"
import { MapPin, TrainIcon, Zap } from "lucide-react"

interface MovingTrain {
  id: string
  name: string
  position: number // 0-100 percentage along route
  priority: number
  currentSection: string
}

export function InteractiveRailwayMap() {
  const [movingTrains, setMovingTrains] = useState<MovingTrain[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  useEffect(() => {
    const initialTrains: MovingTrain[] = trains.map((train, index) => ({
      id: train.id,
      name: train.name,
      position: Math.random() * 100,
      priority: train.priority,
      currentSection: networkSections[index % networkSections.length]?.id || networkSections[0]?.id,
    }))
    setMovingTrains(initialTrains)
  }, [])

  // Animate train movements
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingTrains((prev) =>
        prev.map((train) => ({
          ...train,
          position: (train.position + (Math.random() * 2 + 0.5)) % 100,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getSectionStatus = (sectionId: string) => {
    const trainsInSection = movingTrains.filter((train) => train.currentSection === sectionId)
    if (trainsInSection.length === 0) return { status: "free", color: "bg-green-500", label: "Free" }
    if (trainsInSection.length === 1) return { status: "occupied", color: "bg-yellow-500", label: "Occupied" }
    return { status: "congested", color: "bg-red-500", label: "Congested" }
  }

  const getTrainColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-600"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-blue-500"
      case 5:
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Card className="shadow-2xl backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 text-white rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <CardTitle className="relative flex items-center gap-2 text-lg">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <MapPin className="h-5 w-5" />
            </motion.div>
            Interactive Railway Network Map
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrainIcon className="h-5 w-5 text-blue-400" />
              Howrah → Asansol → Dhanbad → Gaya Corridor
            </h3>

            {/* Railway Line Visualization */}
            <div className="relative bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-500/30">
              {/* Main Railway Line */}
              <div className="relative">
                <div className="h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-inner" />

                {/* Railway Ties */}
                <div className="absolute inset-0 flex justify-between items-center">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-0.5 h-4 bg-gray-600 rounded" />
                  ))}
                </div>

                {/* Stations */}
                <div className="absolute inset-0 flex justify-between items-center -mt-2">
                  {stations.map((station, index) => (
                    <motion.div
                      key={station.id}
                      className="relative flex flex-col items-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                      <div className="mt-2 text-center">
                        <Badge variant="secondary" className="text-xs bg-white/90 shadow-sm">
                          {station.code}
                        </Badge>
                        <p className="text-xs text-gray-300 mt-1 font-medium">{station.name}</p>
                        <p className="text-xs text-gray-400">{station.platforms}P</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Moving Trains */}
                <AnimatePresence>
                  {movingTrains.map((train) => (
                    <motion.div
                      key={train.id}
                      className="absolute top-1/2 -translate-y-1/2 -mt-1"
                      style={{ left: `${train.position}%` }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`w-3 h-2 ${getTrainColor(train.priority)} rounded-sm shadow-lg cursor-pointer relative group`}
                      >
                        {/* Train tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                          {train.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-2 border-transparent border-t-black" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Section Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {networkSections.map((section, index) => {
                const status = getSectionStatus(section.id)
                const isSelected = selectedSection === section.id

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedSection(isSelected ? null : section.id)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected ? "ring-2 ring-blue-400 shadow-lg" : ""
                    }`}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-blue-400/50 hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs font-mono bg-white/20 text-white border-white/30">
                          {section.id}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${status.color} rounded-full shadow-sm`} />
                          <span className="text-xs text-gray-300">{status.label}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm text-white mb-2">{section.name}</h4>
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>{section.distance} km</span>
                        <span>{section.maxSpeed} km/h</span>
                      </div>

                      {/* Trains in section */}
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {movingTrains
                            .filter((train) => train.currentSection === section.id)
                            .map((train) => (
                              <div
                                key={train.id}
                                className={`w-2 h-2 ${getTrainColor(train.priority)} rounded-full`}
                                title={train.name}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              Major Stations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stations.map((station, index) => (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-green-400/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                      {station.code}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm text-white mb-1">{station.name}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{station.platforms} platforms</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          >
            <h4 className="font-medium text-sm text-white mb-2">Legend</h4>
            <div className="flex flex-wrap gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 bg-red-600 rounded-sm" />
                <span>Priority 1 (Rajdhani)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 bg-orange-500 rounded-sm" />
                <span>Priority 2 (Express)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 bg-blue-500 rounded-sm" />
                <span>Priority 4 (Local)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 bg-gray-500 rounded-sm" />
                <span>Priority 5 (Freight)</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
