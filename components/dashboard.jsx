"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NudgeCard } from "@/components/nudge-card"

function StatCard({ label, value, subtext }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </CardContent>
    </Card>
  )
}

export function Dashboard({ state, currentTask, onCompleteTask }) {
  const missedDay = state.streak === 0 && state.day > 1

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Streak" value={`${state.streak} days`} />
        <StatCard label="Target Band" value={state.targetBand} />
        <StatCard
          label="Predicted Band"
          value={state.predictedBand.toFixed(2)}
          subtext={state.day > 1 ? `was ${(state.predictedBand - 0.05).toFixed(2)}` : undefined}
        />
        <StatCard label="Duration" value={`${currentTask.duration} min`} />
      </div>

      {missedDay && (
        <NudgeCard targetBand={state.targetBand} predictedBand={state.predictedBand} />
      )}

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <CardTitle className="text-lg">{currentTask.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{currentTask.description}</p>
          </div>
          <Badge variant="secondary">{currentTask.skill}</Badge>
        </CardHeader>
        <CardContent>
          {currentTask.completed ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Done for today
            </div>
          ) : (
            <Button onClick={onCompleteTask} className="w-full sm:w-auto">
              Complete Task
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
