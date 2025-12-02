"use client"

import { useState } from "react"
import { ImageCard } from "./image-card"

interface GalleryImage {
  id: string
  src: string
  label: string
  upvotes: number
  downvotes: number
}

const initialImages: GalleryImage[] = [
  {
    id: "1",
    src: "/street-food-vendor-in-ghana.jpg",
    label: "Street Food Vendor",
    upvotes: 24,
    downvotes: 2,
  },
  {
    id: "2",
    src: "/bustling-african-marketplace.jpg",
    label: "Local Market Scene",
    upvotes: 18,
    downvotes: 1,
  },
  {
    id: "3",
    src: "/colorful-kente-cloth-pattern.jpg",
    label: "Kente Cloth Pattern",
    upvotes: 45,
    downvotes: 3,
  },
  {
    id: "4",
    src: "/colonial-architecture-building-africa.jpg",
    label: "Colonial Architecture",
    upvotes: 31,
    downvotes: 5,
  },
  {
    id: "5",
    src: "/african-wildlife-safari-elephant.jpg",
    label: "Wildlife Safari",
    upvotes: 67,
    downvotes: 4,
  },
  {
    id: "6",
    src: "/tropical-beach-sunset-africa.jpg",
    label: "Beach Sunset",
    upvotes: 52,
    downvotes: 2,
  },
]

export function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)

  const handleVote = (id: string, type: "up" | "down") => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id === id) {
          return {
            ...img,
            upvotes: type === "up" ? img.upvotes + 1 : img.upvotes,
            downvotes: type === "down" ? img.downvotes + 1 : img.downvotes,
          }
        }
        return img
      }),
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} {...image} onVote={handleVote} />
      ))}
    </div>
  )
}
