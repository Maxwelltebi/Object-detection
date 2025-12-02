"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { login, user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  // Redirect if already logged in
  if (user) {
    router.push("/")
    return null
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setStatus("idle")

    try {
      await login()
      setStatus("success")
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch {
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">GUAVA</h1>
        <p className="text-muted-foreground">Gamified Data Collection Platform</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue uploading images and earning coins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "success" && (
            <Alert className="bg-success/10 border-success text-success">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Login successful! Redirecting...</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Login failed. Please try again.</AlertDescription>
            </Alert>
          )}

          <Button
            variant="outline"
            className="w-full h-12 gap-3 font-medium bg-transparent"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground transition-colors text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground transition-colors text-primary">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Demo Note */}
      <p className="mt-6 text-sm text-muted-foreground text-center max-w-md">
        This is a demo. Click &quot;Continue with Google&quot; to simulate login.
      </p>
    </div>
  )
}
