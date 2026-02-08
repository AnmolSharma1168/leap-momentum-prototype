"use client"

import { useState, useCallback } from "react"
import { Onboarding } from "@/components/onboarding"
import { Dashboard } from "@/components/dashboard"
import { ProgressScreen } from "@/components/progress-screen"
import { getTaskForDay } from "@/lib/mock-tasks"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const STARTING_BAND = 6.0

function skillKeyFromName(skill) {
  const map = {
    Speaking: "speaking",
    Writing: "writing",
    Listening: "listening",
    Reading: "reading",
  }
  return map[skill] || null
}

function buildInitialState() {
  return {
    targetBand: "",
    anchors: [],
    day: 1,
    streak: 0,
    predictedBand: STARTING_BAND,
    tasksCompleted: 0,
    skillProgress: { speaking: 0, writing: 0, listening: 0, reading: 0 },
  }
}

export default function Page() {
  const [onboarded, setOnboarded] = useState(false)
  const [appState, setAppState] = useState(buildInitialState)
  const [currentTask, setCurrentTask] = useState(() => getTaskForDay(1))

  const handleOnboardingDone = useCallback((data) => {
    setAppState((prev) => ({
      ...prev,
      targetBand: data.targetBand,
      anchors: data.anchors,
      streak: 1,
    }))
    setOnboarded(true)
  }, [])

  const handleCompleteTask = useCallback(() => {
    setCurrentTask((prev) => ({ ...prev, completed: true }))
    setAppState((prev) => {
      const key = skillKeyFromName(currentTask.skill)
      const updatedSkills = { ...prev.skillProgress }
      if (key) {
        updatedSkills[key] = Math.min(100, updatedSkills[key] + Math.floor(Math.random() * 8) + 5)
      }
      return {
        ...prev,
        streak: prev.streak + 1,
        predictedBand: Math.min(parseFloat(prev.targetBand), prev.predictedBand + 0.05),
        tasksCompleted: prev.tasksCompleted + 1,
        skillProgress: updatedSkills,
      }
    })
  }, [currentTask.skill])

  const advanceDay = useCallback(() => {
    setAppState((prev) => {
      const next = Math.min(28, prev.day + 1)
      return { ...prev, day: next }
    })
    setCurrentTask(() => getTaskForDay(Math.min(28, appState.day + 1)))
  }, [appState.day])

  const simulateMiss = useCallback(() => {
    const nextDay = Math.min(28, appState.day + 1)
    setAppState((prev) => ({ ...prev, day: nextDay, streak: 0 }))
    setCurrentTask(getTaskForDay(nextDay))
  }, [appState.day])

  const resetAll = useCallback(() => {
    setOnboarded(false)
    setAppState(buildInitialState())
    setCurrentTask(getTaskForDay(1))
  }, [])

  if (!onboarded) {
    return <Onboarding onComplete={handleOnboardingDone} />
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl p-4 sm:p-6">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-foreground">Leap Momentum Catalyst</h1>
        <p className="text-sm text-muted-foreground">28-Day IELTS Preparation</p>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
          <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard
            state={appState}
            currentTask={currentTask}
            onCompleteTask={handleCompleteTask}
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressScreen state={appState} />
        </TabsContent>
      </Tabs>

      <div className="mt-8 border-t pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Prototype Controls
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={advanceDay} disabled={appState.day >= 28}>
            Advance Day
          </Button>
          <Button variant="outline" size="sm" onClick={simulateMiss}>
            Simulate Missed Day
          </Button>
          <Button variant="outline" size="sm" onClick={resetAll}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
