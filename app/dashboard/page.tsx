"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, TrendingUp, ImageIcon, AlertCircle, CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

interface Upload {
  id: string
  name: string
  date: string
  coins: number
  status: "approved" | "pending" | "rejected"
}

const recentUploads: Upload[] = [
  { id: "1", name: "Street Food Vendor", date: "2025-01-10", coins: 1, status: "approved" },
  { id: "2", name: "Local Market Scene", date: "2025-01-09", coins: 1, status: "approved" },
  { id: "3", name: "Traditional Craft", date: "2025-01-08", coins: 0, status: "pending" },
  { id: "4", name: "Beach Landscape", date: "2025-01-07", coins: 1, status: "approved" },
  { id: "5", name: "City Architecture", date: "2025-01-06", coins: 0, status: "rejected" },
  { id: "6", name: "Wildlife Photo", date: "2025-01-05", coins: 1, status: "approved" },
]

const COIN_TO_CEDI_RATE = 0.1 // 1 coin = 0.10 GHC
const MIN_WITHDRAW_GHC = 10

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")

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

  const cediBalance = user.coins * COIN_TO_CEDI_RATE
  const canWithdraw = cediBalance >= MIN_WITHDRAW_GHC
  const approvedUploads = recentUploads.filter((u) => u.status === "approved").length
  const totalEarnings = recentUploads.reduce((sum, u) => sum + u.coins, 0)

  const handleWithdraw = () => {
    // Simulate withdrawal
    alert(`Withdrawal request of GH₵${cediBalance.toFixed(2)} sent to ${mobileNumber}`)
    setWithdrawDialogOpen(false)
    setMobileNumber("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Coins</CardTitle>
              <Coins className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.coins}</div>
              <p className="text-sm text-muted-foreground mt-1">≈ GH₵{cediBalance.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved Uploads</CardTitle>
              <ImageIcon className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{approvedUploads}</div>
              <p className="text-sm text-muted-foreground mt-1">Out of {recentUploads.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              <TrendingUp className="w-5 h-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalEarnings}</div>
              <p className="text-sm text-muted-foreground mt-1">Coins from uploads</p>
            </CardContent>
          </Card>
        </div>

        {/* Withdraw Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Withdraw Earnings</CardTitle>
            <CardDescription>
              Convert your coins to Ghanaian Cedis. Minimum withdrawal: GH₵{MIN_WITHDRAW_GHC}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">GH₵{cediBalance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  Available balance ({user.coins} coins × GH₵{COIN_TO_CEDI_RATE})
                </p>
              </div>

              <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={!canWithdraw}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold disabled:opacity-50"
                  >
                    Request Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                    <DialogDescription>
                      Enter your mobile money number to receive GH₵{cediBalance.toFixed(2)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="mobile" className="mb-2 block">
                      Mobile Money Number
                    </Label>
                    <Input
                      id="mobile"
                      placeholder="024XXXXXXX"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleWithdraw}
                      disabled={!mobileNumber}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Confirm Withdrawal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {!canWithdraw && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>You need at least GH₵{MIN_WITHDRAW_GHC} to withdraw. Upload more images to earn coins!</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Your image upload history and coin earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Image Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Coins</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((upload, index) => (
                    <tr key={upload.id} className={`border-b border-border ${index % 2 === 0 ? "bg-muted/30" : ""}`}>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{upload.name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(upload.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={upload.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-semibold ${upload.coins > 0 ? "text-primary" : "text-muted-foreground"}`}
                        >
                          +{upload.coins}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatusBadge({ status }: { status: Upload["status"] }) {
  const styles = {
    approved: { className: "bg-success/10 text-success", icon: CheckCircle },
    pending: { className: "bg-primary/10 text-primary", icon: AlertCircle },
    rejected: { className: "bg-destructive/10 text-destructive", icon: AlertCircle },
  }

  const { className, icon: Icon } = styles[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${className}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}
