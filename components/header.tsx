"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Coins, User, LayoutDashboard, LogOut, Menu, X, Upload } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            GUAVA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/upload" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Upload
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                {/* Coin Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm text-primary coin-update" key={user.coins}>
                    {user.coins}
                  </span>
                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden" aria-label="User menu">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.name}'s avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {user && (
                <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg bg-primary/10 sm:hidden">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{user.coins} Coins</span>
                </div>
              )}
              <Link
                href="/"
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upload
              </Link>
              <Link
                href="/profile"
                className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
