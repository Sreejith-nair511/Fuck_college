"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { InteractiveRailwayMap } from "@/components/InteractiveRailwayMap"
import { NetworkOverview } from "@/components/NetworkOverview"
import { networkSections, stations } from "@/lib/mockData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Activity, AlertTriangle } from "lucide-react"

export default function NetworkPage() {
  return (
    <PageLayout title="Network Map & Infrastructure" subtitle="Real-time Railway Network Monitoring">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map - Takes up 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InteractiveRailwayMap />
          </motion.div>

          {/* Network Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Sections</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {networkSections.filter((s) => s.status === "Clear").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Congested</span>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    {networkSections.filter((s) => s.status === "Congested").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Blocked</span>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    {networkSections.filter((s) => s.status === "Blocked").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Major Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stations.slice(0, 5).map((station) => (
                  <div key={station.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{station.name}</span>
                    <Badge variant="outline" className="text-xs border-white/30 text-white">
                      {station.code}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-sm">Signal maintenance at KGP-ASN section</p>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">Track work between DHN-GMO</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Network Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6"
        >
          <NetworkOverview sections={networkSections} stations={stations} />
        </motion.div>
      </div>
    </PageLayout>
  )
}
