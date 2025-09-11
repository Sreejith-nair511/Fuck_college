"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, Zap, Package } from "lucide-react"

const trainImages = [
  {
    id: "12301",
    name: "Rajdhani Express",
    image: "/trains/rajdhani-express.jpg",
    type: "Express",
    description: "Premium AC train connecting major cities",
  },
  {
    id: "12002",
    name: "Shatabdi Express",
    image: "/trains/shatabdi-express.jpg",
    type: "Express",
    description: "Day-time intercity express service",
  },
  {
    id: "12273",
    name: "Duronto Express",
    image: "/trains/duronto-express.jpg",
    type: "Express",
    description: "Non-stop long distance express",
  },
  {
    id: "12611",
    name: "Garib Rath Express",
    image: "/trains/garib-rath.jpg",
    type: "Express",
    description: "Budget AC express service",
  },
  {
    id: "FR001",
    name: "Freight Train",
    image: "/trains/freight-train.jpg",
    type: "Freight",
    description: "Heavy goods transportation",
  },
  {
    id: "FR002",
    name: "Container Train",
    image: "/trains/container-train.jpg",
    type: "Freight",
    description: "Containerized cargo service",
  },
  {
    id: "WAP7",
    name: "WAP-7 Locomotive",
    image: "/trains/wap7-locomotive.jpg",
    type: "Locomotive",
    description: "High-power electric locomotive",
  },
  {
    id: "WDM3A",
    name: "WDM-3A Locomotive",
    image: "/trains/wdm3a-locomotive.jpg",
    type: "Locomotive",
    description: "Diesel locomotive for freight",
  },
]

export default function GalleryPage() {
  return (
    <PageLayout title="Train Gallery" subtitle="Indian Railways Fleet Photography">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {trainImages.map((train, index) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={train.image || "/placeholder.svg"}
                    alt={train.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge
                    className={`absolute top-3 right-3 ${
                      train.type === "Express"
                        ? "bg-blue-500/80"
                        : train.type === "Freight"
                          ? "bg-orange-500/80"
                          : "bg-purple-500/80"
                    } text-white border-0`}
                  >
                    {train.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {train.type === "Express" ? (
                      <Zap className="w-4 h-4 text-blue-400" />
                    ) : train.type === "Freight" ? (
                      <Package className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Train className="w-4 h-4 text-purple-400" />
                    )}
                    <h3 className="text-white font-semibold text-sm">{train.name}</h3>
                  </div>
                  <p className="text-gray-300 text-xs mb-1">Train ID: {train.id}</p>
                  <p className="text-gray-400 text-xs">{train.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Train Types Legend */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Train className="w-5 h-5" />
                Train Types in Indian Railways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Express Trains</p>
                    <p className="text-gray-300 text-sm">High-speed passenger services</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <Package className="w-6 h-6 text-orange-400" />
                  <div>
                    <p className="text-white font-medium">Freight Trains</p>
                    <p className="text-gray-300 text-sm">Cargo and goods transport</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <Train className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Locomotives</p>
                    <p className="text-gray-300 text-sm">Electric and diesel engines</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  )
}
