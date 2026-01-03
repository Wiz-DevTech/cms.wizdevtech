"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, BarChart, Settings, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">5</span>
              </div>
              <h1 className="text-2xl font-bold">5CMS</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/preview">
                <Button>Preview Demo</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Advanced Content Management
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven content management with role-based access control, 
            real-time collaboration, and modern UI built with Next.js 15.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/preview">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Preview Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Powerful Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Create, edit, and publish content with our intuitive editor and AI-powered suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Role-based access control, workflow management, and real-time collaboration tools.
              </CardDescription>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Analytics & SEO</CardTitle>
              <CardDescription>
                Comprehensive analytics, SEO optimization, and performance tracking.
              </CardDescription>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Customizable</CardTitle>
              <CardDescription>
                Flexible configuration, custom fields, and extensible architecture.
              </CardDescription>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Secure</CardTitle>
              <CardDescription>
                    Enterprise-grade security with audit logs and data protection.
              </CardDescription>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>
                Intelligent content suggestions, auto-tagging, and smart workflows.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to transform your content workflow?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams using 5CMS to manage their content efficiently.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-background">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 5CMS by WizDevTech. Built with Next.js 15, TypeScript, and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}