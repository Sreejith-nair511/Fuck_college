"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trains, networkSections } from "@/lib/mockData"
import { BarChart3, TrendingUp, Clock, AlertTriangle, Train, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const onTimePerformance = 87.3
  const averageDelay = 12.5
  const totalTrains = trains.length
  const delayedTrains = trains.filter((t) => t.delay > 0).length

  return (
    <PageLayout title="Analytics & Performance" subtitle="Railway Network Performance Metrics">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{onTimePerformance}%</p>
                  <p className="text-gray-300 text-sm">On-Time Performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{averageDelay}m</p>
                  <p className="text-gray-300 text-sm">Avg Delay</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Train className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalTrains}</p>
                  <p className="text-gray-300 text-sm">Active Trains</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{delayedTrains}</p>
                  <p className="text-gray-300 text-sm">Delayed Trains</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Today</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      <span className="text-white text-sm">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Yesterday</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="text-white text-sm">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">This Week</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                      <span className="text-white text-sm">84%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">This Month</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                      </div>
                      <span className="text-white text-sm">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Performance */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Section Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {networkSections.slice(0, 6).map((section) => (
                    <div key={section.id} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{section.name}</span>
                      <Badge
                        className={`${
                          section.status === "Clear"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : section.status === "Congested"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                        }`}
                      >
                        {section.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
