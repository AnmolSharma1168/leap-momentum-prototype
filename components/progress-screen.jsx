"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const SKILLS = [
  { key: "speaking", label: "Speaking" },
  { key: "writing", label: "Writing" },
  { key: "listening", label: "Listening" },
  { key: "reading", label: "Reading" },
]

export function ProgressScreen({ state }) {
  const journeyPercent = Math.round((state.day / 28) * 100)

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">28-Day Journey</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Day {state.day} of 28</span>
            <span className="font-medium">{journeyPercent}%</span>
          </div>
          <Progress value={journeyPercent} aria-label="Overall journey progress" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skill Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {SKILLS.map((skill) => (
            <div key={skill.key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>{skill.label}</span>
                <span className="text-muted-foreground">
                  {state.skillProgress[skill.key]}%
                </span>
              </div>
              <Progress
                value={state.skillProgress[skill.key]}
                className="h-2"
                aria-label={`${skill.label} progress`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Tasks Completed</dt>
              <dd className="text-lg font-semibold">{state.tasksCompleted}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Current Streak</dt>
              <dd className="text-lg font-semibold">{state.streak} days</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Target Band</dt>
              <dd className="text-lg font-semibold">{state.targetBand}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Predicted Band</dt>
              <dd className="text-lg font-semibold">{state.predictedBand.toFixed(2)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
