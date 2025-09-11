"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { TrainList } from "@/components/TrainList"
import { trains } from "@/lib/mockData"
import { Card, CardContent } from "@/components/ui/card"
import { Train, Clock, MapPin, Zap } from "lucide-react"

export default function TrainsPage() {
  const passengerTrains = trains.filter((t) => t.type === "Passenger")
  const freightTrains = trains.filter((t) => t.type === "Freight")
  const delayedTrains = trains.filter((t) => t.delay > 0)

  return (
    <PageLayout title="Train Fleet Management" subtitle="Real-time Train Monitoring & Control">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Fleet Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Train className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{trains.length}</p>
                  <p className="text-gray-300 text-sm">Total Trains</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{passengerTrains.length}</p>
                  <p className="text-gray-300 text-sm">Passenger</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{freightTrains.length}</p>
                  <p className="text-gray-300 text-sm">Freight</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{delayedTrains.length}</p>
                  <p className="text-gray-300 text-sm">Delayed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Train List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TrainList trains={trains} />
        </motion.div>
      </div>
    </PageLayout>
  )
}
