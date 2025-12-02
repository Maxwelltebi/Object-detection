"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCardProps {
  id: string
  src: string
  label: string
  upvotes: number
  downvotes: number
  onVote: (id: string, type: "up" | "down") => void
}

export function ImageCard({ id, src, label, upvotes, downvotes, onVote }: ImageCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) return

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    setUserVote(type)
    onVote(id, type)
  }

  return (
    <article className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:translate-y-[-2px] shadow-[0_4px_20px_rgba(255,133,89,0.15)]">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={src || "/placeholder.svg"}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-foreground truncate mb-3">{label}</h3>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("up")}
            className={`vote-transition gap-1.5 ${
              userVote === "up"
                ? "text-success bg-success/10"
                : "text-muted-foreground hover:text-success hover:bg-success/10"
            }`}
            aria-label={`Upvote ${label}`}
            aria-pressed={userVote === "up"}
          >
            <ThumbsUp className={`w-4 h-4 ${isAnimating && userVote === "up" ? "animate-bounce" : ""}`} />
            <span className="font-semibold">{upvotes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("down")}
            className={`vote-transition gap-1.5 ${
              userVote === "down"
                ? "text-destructive bg-destructive/10"
                : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            }`}
            aria-label={`Downvote ${label}`}
            aria-pressed={userVote === "down"}
          >
            <ThumbsDown className={`w-4 h-4 ${isAnimating && userVote === "down" ? "animate-bounce" : ""}`} />
            <span className="font-semibold">{downvotes}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
