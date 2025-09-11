"use client"

import { InteractiveRailwayMap } from "./InteractiveRailwayMap"
import type { NetworkSection, Station } from "@/lib/mockData"
import { trains } from "@/lib/mockData"

interface NetworkOverviewProps {
  sections: NetworkSection[]
  stations: Station[]
}

export function NetworkOverview({ sections, stations }: NetworkOverviewProps) {
  return <InteractiveRailwayMap sections={sections} stations={stations} trains={trains} />
}
