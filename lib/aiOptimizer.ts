import type { Train, OptimizationResult, OptimizationRecommendation } from "./mockData"

export type OptimizationMode = "Heuristic" | "Simulated AI"

// Calculate train score based on priority and current delay
function calculateTrainScore(train: Train): number {
  const priorityWeight = (6 - train.priority) * 20 // Higher priority = higher score
  const delayPenalty = (train.currentDelay || 0) * -2 // Delay reduces score
  return Math.max(0, priorityWeight + delayPenalty)
}

// Heuristic optimization logic
function heuristicOptimization(trains: Train[]): OptimizationResult {
  const recommendations: OptimizationRecommendation[] = []
  let totalScore = 0

  // Sort trains by priority (1 = highest priority)
  const sortedTrains = [...trains].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority
    }
    // If same priority, prioritize trains with less delay
    return (a.currentDelay || 0) - (b.currentDelay || 0)
  })

  sortedTrains.forEach((train, index) => {
    const trainScore = calculateTrainScore(train)
    let action: "PROCEED" | "HOLD_5_MIN" | "PRIORITY_CLEARANCE" = "PROCEED"
    let expectedDelay = train.currentDelay || 0

    // High priority trains (1-2) get priority clearance if delayed
    if (train.priority <= 2 && (train.currentDelay || 0) > 0) {
      action = "PRIORITY_CLEARANCE"
      expectedDelay = Math.max(0, expectedDelay - 3)
    }
    // Lower priority trains may need to hold if there's congestion
    else if (train.priority >= 4 && index > 2) {
      action = "HOLD_5_MIN"
      expectedDelay += 5
    }
    // Freight trains get delayed in congestion
    else if (train.priority === 5 && sortedTrains.length > 3) {
      action = "HOLD_5_MIN"
      expectedDelay += 8
    }

    recommendations.push({
      trainId: train.id,
      trainName: `${train.number} ${train.name}`,
      action,
      expectedDelay,
      trainScore,
    })

    totalScore += trainScore
  })

  return {
    recommendations,
    throughputScore: Math.round(totalScore / trains.length),
  }
}

// Simulated AI optimization (adds randomness and delay)
async function simulatedAIOptimization(trains: Train[]): Promise<OptimizationResult> {
  // Add 0.5s delay to simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 500))

  const baseResult = heuristicOptimization(trains)

  // Add some randomness to make it feel more "AI-like"
  const enhancedRecommendations = baseResult.recommendations.map((rec) => {
    const randomFactor = Math.random() * 0.2 - 0.1 // ±10% randomness
    const adjustedDelay = Math.max(0, Math.round(rec.expectedDelay * (1 + randomFactor)))

    return {
      ...rec,
      expectedDelay: adjustedDelay,
      trainScore: Math.round(rec.trainScore * (1 + randomFactor * 0.5)),
    }
  })

  // Slightly improve throughput score for "AI" mode
  const enhancedThroughput = Math.round(baseResult.throughputScore * 1.1)

  return {
    recommendations: enhancedRecommendations,
    throughputScore: enhancedThroughput,
  }
}

// Main optimization function
export async function optimizeSchedule(trains: Train[], mode: OptimizationMode): Promise<OptimizationResult> {
  if (mode === "Simulated AI") {
    return simulatedAIOptimization(trains)
  } else {
    return heuristicOptimization(trains)
  }
}
