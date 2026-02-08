"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BAND_OPTIONS = ["6.5", "7", "7.5", "8"]

const ANCHOR_OPTIONS = [
  { id: "morning", label: "Morning" },
  { id: "commute", label: "Commute" },
  { id: "night", label: "Night" },
]

export function Onboarding({ onComplete }) {
  const [targetBand, setTargetBand] = useState("")
  const [anchors, setAnchors] = useState([])

  function toggleAnchor(anchor) {
    setAnchors((prev) =>
      prev.includes(anchor) ? prev.filter((a) => a !== anchor) : [...prev, anchor]
    )
  }

  function handleSubmit() {
    if (!targetBand || anchors.length === 0) return
    onComplete({ targetBand, anchors })
  }

  const canSubmit = targetBand !== "" && anchors.length > 0

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Leap Momentum Catalyst</CardTitle>
          <CardDescription>
            Set up your 28-day IELTS preparation journey
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="target-band">Target IELTS Band</Label>
            <Select value={targetBand} onValueChange={setTargetBand}>
              <SelectTrigger id="target-band">
                <SelectValue placeholder="Select target band" />
              </SelectTrigger>
              <SelectContent>
                {BAND_OPTIONS.map((band) => (
                  <SelectItem key={band} value={band}>
                    Band {band}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Daily Routine Anchors</Label>
            <p className="text-sm text-muted-foreground">
              When do you prefer to study?
            </p>
            {ANCHOR_OPTIONS.map((anchor) => (
              <div key={anchor.id} className="flex items-center gap-3">
                <Checkbox
                  id={anchor.id}
                  checked={anchors.includes(anchor.id)}
                  onCheckedChange={() => toggleAnchor(anchor.id)}
                />
                <Label htmlFor={anchor.id} className="cursor-pointer font-normal">
                  {anchor.label}
                </Label>
              </div>
            ))}
          </div>

          <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full">
            Start 28-Day Momentum Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
