"use client"

import LoginForm from "@/components/wsu/LoginForm"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[350px]">
        <div className="flex items-center justify-center mb-2">
          <Leaf className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl text-center mb-4">Welcome to WeSeedU</h1>
        <LoginForm />
      </div>
    </div>
  )
}

