// Mock data for Indian Railways Traffic Control System

export interface NetworkSection {
  id: string
  name: string
  from: string
  to: string
  distance: number // km
  maxSpeed: number // km/h
}

export interface Station {
  id: string
  name: string
  platforms: number
}

export interface CoachComposition {
  [key: string]: number
}

export interface Train {
  id: string
  number: string
  name: string
  engine: string
  priority: 1 | 2 | 3 | 4 | 5 // 1=highest, 5=lowest
  length: number // meters
  maxSpeed: number // km/h
  route: string[]
  coaches: CoachComposition
  currentDelay?: number // minutes
}

export interface OptimizationRecommendation {
  trainId: string
  trainName: string
  action: "PROCEED" | "HOLD_5_MIN" | "PRIORITY_CLEARANCE"
  expectedDelay: number
  trainScore: number
}

export interface OptimizationResult {
  recommendations: OptimizationRecommendation[]
  throughputScore: number
}

// Network sections data
export const networkSections: NetworkSection[] = [
  {
    id: "HWH-ASN",
    name: "Howrah → Asansol",
    from: "HWH",
    to: "ASN",
    distance: 200,
    maxSpeed: 110,
  },
  {
    id: "ASN-DHN",
    name: "Asansol → Dhanbad",
    from: "ASN",
    to: "DHN",
    distance: 65,
    maxSpeed: 100,
  },
  {
    id: "DHN-GAYA",
    name: "Dhanbad → Gaya",
    from: "DHN",
    to: "GAYA",
    distance: 120,
    maxSpeed: 110,
  },
]

// Stations data
export const stations: Station[] = [
  { id: "HWH", name: "Howrah", platforms: 23 },
  { id: "ASN", name: "Asansol", platforms: 7 },
  { id: "DHN", name: "Dhanbad", platforms: 6 },
  { id: "GAYA", name: "Gaya", platforms: 5 },
]

// Trains data
export const trains: Train[] = [
  {
    id: "12301",
    number: "12301",
    name: "Rajdhani Express",
    engine: "WAP7",
    priority: 1,
    length: 750,
    maxSpeed: 130,
    route: ["HWH", "ASN", "GAYA"],
    coaches: { "1A": 1, "2A": 3, "3A": 5 },
    currentDelay: 0,
  },
  {
    id: "13010",
    number: "13010",
    name: "Doon Express",
    engine: "WAP4",
    priority: 2,
    length: 650,
    maxSpeed: 110,
    route: ["HWH", "ASN", "DHN"],
    coaches: { SL: 12, "3A": 5, "2A": 2 },
    currentDelay: 5,
  },
  {
    id: "15659",
    number: "15659",
    name: "Kanchanjunga Express",
    engine: "WAP4",
    priority: 2,
    length: 700,
    maxSpeed: 110,
    route: ["HWH", "ASN", "DHN", "GAYA"],
    coaches: { SL: 14, "3A": 4, "2A": 2, "1A": 1 },
    currentDelay: 2,
  },
  {
    id: "63501",
    number: "63501",
    name: "Local MEMU",
    engine: "WDM3D",
    priority: 4,
    length: 350,
    maxSpeed: 80,
    route: ["ASN", "DHN"],
    coaches: { GEN: 12 },
    currentDelay: 0,
  },
  {
    id: "15959",
    number: "15959",
    name: "Coal Freight",
    engine: "WAG9",
    priority: 5,
    length: 1400,
    maxSpeed: 70,
    route: ["DHN", "GAYA"],
    coaches: { BOXN: 58 },
    currentDelay: 15,
  },
]

// Priority labels
export const priorityLabels = {
  1: "Rajdhani/Shatabdi/Vande Bharat",
  2: "Mail/Express",
  3: "Passenger",
  4: "Suburban EMU",
  5: "Freight",
}

// Coach type labels
export const coachLabels = {
  "1A": "First AC",
  "2A": "Second AC",
  "3A": "Third AC",
  SL: "Sleeper",
  GEN: "General",
  BOXN: "Freight Box",
}
