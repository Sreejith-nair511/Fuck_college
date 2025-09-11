"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { stations } from "@/lib/mockData"
import { MapPin, Clock, Route, Search } from "lucide-react"
import { useState } from "react"

export default function RoutesPage() {
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")

  const majorRoutes = [
    {
      name: "Howrah - New Delhi",
      distance: "1441 km",
      duration: "17h 20m",
      trains: ["12301 Rajdhani", "12313 Sealdah Rajdhani", "12023 Janshatabdi"],
      status: "Active",
    },
    {
      name: "Mumbai - Chennai",
      distance: "1279 km",
      duration: "21h 15m",
      trains: ["12163 Chennai Express", "12615 Grand Trunk Express"],
      status: "Active",
    },
    {
      name: "Delhi - Bangalore",
      distance: "2444 km",
      duration: "34h 45m",
      trains: ["12429 Rajdhani Express", "22691 Rajdhani Express"],
      status: "Active",
    },
    {
      name: "Kolkata - Mumbai",
      distance: "1968 km",
      duration: "26h 30m",
      trains: ["12809 Howrah Mail", "12834 Howrah Express"],
      status: "Congested",
    },
  ]

  return (
    <PageLayout title="Route Planning & Management" subtitle="Optimize Train Routes & Schedules">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Route Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Route className="w-5 h-5" />
                Route Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">From Station</label>
                  <Select value={fromStation} onValueChange={setFromStation}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.slice(0, 10).map((station) => (
                        <SelectItem key={station.id} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">To Station</label>
                  <Select value={toStation} onValueChange={setToStation}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.slice(0, 10).map((station) => (
                        <SelectItem key={station.id} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Date</label>
                  <Input
                    type="date"
                    className="bg-white/10 border-white/20 text-white"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                    <Search className="w-4 h-4 mr-2" />
                    Find Routes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Major Routes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Major Railway Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {majorRoutes.map((route, index) => (
                  <motion.div
                    key={route.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold">{route.name}</h3>
                          <Badge
                            className={`${
                              route.status === "Active"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            }`}
                          >
                            {route.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {route.distance}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {route.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {route.trains.map((train) => (
                          <Badge key={train} variant="outline" className="text-xs border-white/30 text-white">
                            {train}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}
