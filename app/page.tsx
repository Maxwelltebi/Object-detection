"use client"

import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Camera, Coins } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { user, isLoading } = useAuth()

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Earn coins for every approved upload</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Contribute to AI Training, <span className="text-primary">Get Rewarded</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Guava is a community-driven platform where your images help train AI models. Upload quality images, vote on
            others&apos; contributions, and earn coins you can withdraw as real money.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/upload">
              <Button
                size="lg"
                className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8"
              >
                <Upload className="w-5 h-5" />
                Upload Picture
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 font-semibold px-8 border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Coins className="w-5 h-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-secondary/10">
              <Camera className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Images</h3>
            <p className="text-muted-foreground text-sm">
              Share photos from your daily life, local markets, landscapes, and more.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Earn Coins</h3>
            <p className="text-muted-foreground text-sm">
              Get 1 coin for each approved image. Coins convert to real money.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-success/10">
              <Sparkles className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Help AI Learn</h3>
            <p className="text-muted-foreground text-sm">
              Your contributions help train AI models to better understand diverse data.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Community Gallery</h2>
            <span className="text-sm text-muted-foreground">Vote on images to help curate quality data</span>
          </div>

          <ImageGallery />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">GUAVA</span>
              <span className="text-muted-foreground">© 2025 All rights reserved</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
