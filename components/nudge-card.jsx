"use client"

import { Card, CardContent } from "@/components/ui/card"

export function NudgeCard({ targetBand, predictedBand }) {
  const gap = (parseFloat(targetBand) - predictedBand).toFixed(1)

  return (
    <Card className="border-border bg-muted/50">
      <CardContent className="flex flex-col gap-2 p-4">
        <p className="text-sm font-medium text-foreground">
          Missed yesterday? No worries — try a quick 3-minute task.
        </p>
        <p className="text-sm text-muted-foreground">
          {"You're"} {gap} bands away from your target.
        </p>
      </CardContent>
    </Card>
  )
}
