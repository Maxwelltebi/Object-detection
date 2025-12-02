"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload, X, ImageIcon, Loader2, Info, CheckCircle } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"]

const categories = [
  "Food & Cuisine",
  "Markets & Commerce",
  "Architecture",
  "Nature & Wildlife",
  "People & Culture",
  "Transportation",
  "Arts & Crafts",
  "Other",
]

export default function UploadPage() {
  const { user, isLoading, updateCoins } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Please upload a JPEG or PNG image"
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB"
    }
    return null
  }

  const handleFile = (file: File) => {
    const error = validateFile(file)
    if (error) {
      setErrors({ ...errors, file: error })
      return
    }

    setFile(file)
    setErrors({ ...errors, file: "" })

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>?/gm, "").trim()
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!file) {
      newErrors.file = "Please upload an image"
    }
    if (!imageName.trim()) {
      newErrors.imageName = "Image name is required"
    }
    if (!consent) {
      newErrors.consent = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update coins (simulating approval)
    updateCoins(1)

    toast({
      title: "Upload Successful!",
      description: "Your image has been submitted for review. You'll earn 1 coin when approved.",
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Image</h1>
        <p className="text-muted-foreground mb-8">Share quality images and earn coins for approved uploads</p>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Image Upload
              </CardTitle>
              <CardDescription>Drag and drop or click to select an image (JPEG/PNG, max 5MB)</CardDescription>
            </CardHeader>
            <CardContent>
              {!preview ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : errors.file
                        ? "border-destructive"
                        : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload image file"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-secondary/10">
                      <Upload className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Drop your image here, or <span className="text-primary">browse</span>
                      </p>
                      <p className="text-sm text-muted-foreground">JPEG or PNG, up to 5MB</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview of uploaded image"
                    className="w-full rounded-xl object-cover max-h-96"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={clearFile}
                    aria-label="Remove uploaded image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>{file?.name}</span>
                    <span>({(file!.size / 1024).toFixed(1)} KB)</span>
                  </div>
                </div>
              )}

              {errors.file && <p className="text-sm text-destructive mt-2">{errors.file}</p>}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Image Details</CardTitle>
              <CardDescription>Provide information about your image to help with categorization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imageName" className="mb-2 block">
                  Image Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="imageName"
                  placeholder="e.g., Street Food Vendor in Accra"
                  value={imageName}
                  onChange={(e) => setImageName(sanitizeInput(e.target.value))}
                  className={errors.imageName ? "border-destructive" : ""}
                />
                {errors.imageName && <p className="text-sm text-destructive mt-1">{errors.imageName}</p>}
              </div>

              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what's in the image..."
                  value={description}
                  onChange={(e) => setDescription(sanitizeInput(e.target.value))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="location" className="mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Makola Market, Accra"
                  value={location}
                  onChange={(e) => setLocation(sanitizeInput(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  className={errors.consent ? "border-destructive" : ""}
                />
                <div className="flex-1">
                  <Label htmlFor="consent" className="text-sm cursor-pointer">
                    I agree that my uploaded images can be used for AI training and data collection purposes. I confirm
                    that I have the right to share these images and they do not contain inappropriate content.
                  </Label>
                  {errors.consent && <p className="text-sm text-destructive mt-1">{errors.consent}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="w-4 h-4" />
                    <span>Earn 1 Coin on approval</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your image will be reviewed. Once approved, you&apos;ll earn 1 coin!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Submit Image
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
