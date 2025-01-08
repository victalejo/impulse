// app/login/page.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">
            {isLogin ? "Sign in to your account" : "Create new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? (
              <>
                Or{" "}
                <button
                  className="text-primary hover:text-primary/80"
                  onClick={() => setIsLogin(false)}
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="text-primary hover:text-primary/80"
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? "Sign in" : "Create account"}
          </Button>
        </form>
      </Card>
    </div>
  )
}