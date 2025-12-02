"use client"

import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Coins, Calendar, Shield, LogOut } from "lucide-react"
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()

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

  const COIN_TO_CEDI_RATE = 0.1

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile</h1>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.name}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-4 border-primary"
              />
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg text-center bg-primary/10">
                <Coins className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">{user.coins}</p>
                <p className="text-sm text-muted-foreground">Total Coins</p>
              </div>
              <div className="p-4 rounded-lg text-center bg-secondary/10">
                <span className="text-2xl font-bold text-secondary">
                  GH₵{(user.coins * COIN_TO_CEDI_RATE).toFixed(2)}
                </span>
                <p className="text-sm text-muted-foreground mt-1">Balance</p>
              </div>
              <div className="p-4 rounded-lg text-center bg-success/10">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-success" />
                <p className="text-sm font-medium text-foreground">Jan 2025</p>
                <p className="text-sm text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Full Name
              </Label>
              <Input id="name" defaultValue={user.name} disabled />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
            <p className="text-sm text-muted-foreground">
              Account details are managed through Google. Sign out and sign in with a different account to change.
            </p>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Google Account Connected</p>
                <p className="text-sm text-muted-foreground">Signed in with {user.email}</p>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">Active</div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Danger Zone */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Sign Out</p>
            <p className="text-sm text-muted-foreground">Sign out of your Guava account</p>
          </div>
          <Button
            variant="outline"
            className="gap-2 text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </main>
    </div>
  )
}
