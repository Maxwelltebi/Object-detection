"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  coins: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: () => Promise<void>
  logout: () => void
  updateCoins: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("guava_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async () => {
    setIsLoading(true)
    // Simulate Google OAuth login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser: User = {
      id: "1",
      name: "Kwame Asante",
      email: "kwame@example.com",
      avatar: "/african-male-portrait.jpg",
      coins: 125,
    }
    setUser(newUser)
    localStorage.setItem("guava_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("guava_user")
  }

  const updateCoins = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, coins: user.coins + amount }
      setUser(updatedUser)
      localStorage.setItem("guava_user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, updateCoins }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
