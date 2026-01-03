"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Zap, 
  Shield, 
  Globe, 
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  MessageSquare
} from "lucide-react"

export default function HomePage() {
  useEffect(() => {
    // Redirect to the working dashboard after a short delay
    const timer = setTimeout(() => {
      window.location.href = '/dashboard'
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">5</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">5CMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/preview'}>
                <Play className="h-4 w-4 mr-2" />
                Try Demo
              </Button>
              <Button onClick={() => window.location.href = '/dashboard'}>
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Loading 5CMS Dashboard...
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Redirecting you to the main dashboard in a moment...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/preview'}>
              <Play className="h-5 w-5 mr-2" />
              Try Demo Instead
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}