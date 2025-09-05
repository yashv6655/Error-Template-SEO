'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Code, Target, Sparkles, CheckCircle, GitBranch, Bug, Plus, TrendingUp } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function HomePage() {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.trackPageView('Landing Page')
  }, [])

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Uses Claude AI to generate professional GitHub issue templates optimized for clarity and developer productivity"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "YAML Ready",
      description: "Generates proper GitHub issue template YAML format with required fields and troubleshooting steps"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "SEO Optimized",
      description: "Templates designed with SEO-friendly titles and descriptions to improve project discoverability"
    }
  ]

  const exampleTemplates = [
    { 
      type: "Bug Report",
      icon: <Bug className="h-5 w-5" />,
      title: "🐛 Bug Report", 
      description: "Report a bug with environment details, reproduction steps, and expected behavior",
      color: "bg-red-50 border-red-200"
    },
    { 
      type: "Feature Request",
      icon: <Plus className="h-5 w-5" />,
      title: "✨ Feature Request", 
      description: "Request new features with use case description and implementation suggestions",
      color: "bg-green-50 border-green-200"
    },
    { 
      type: "Performance Issue",
      icon: <TrendingUp className="h-5 w-5" />,
      title: "⚡ Performance Issue", 
      description: "Report performance problems with metrics, profiling data, and system specs",
      color: "bg-blue-50 border-blue-200"
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-8 px-4 py-2 text-sm font-medium bg-primary/5 text-primary border-primary/20 rounded-full">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered GitHub Templates
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              Generate professional{' '}
              <span className="text-primary">issue templates</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              Create SEO-optimized GitHub issue templates with AI. Perfect for bug reports, feature requests, 
              and performance issues.
            </p>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => analytics.trackLandingCTA('start_generating')}
              >
                <Link href="/generator">
                  Start Generating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="h-14 px-8 text-lg font-semibold rounded-xl border-2 hover:bg-secondary/50 transition-all"
                onClick={() => analytics.trackLandingCTA('view_examples')}
              >
                <Link href="#example">View Examples</Link>
              </Button>
            </div>
            
            <div className="mt-16 flex items-center justify-center space-x-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">Free to start</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">YAML format</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">SEO optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple three-step process to generate professional issue templates that improve your project&apos;s developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Templates */}
      <section id="example" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
              Template examples
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what your generated templates will look like for different types of GitHub issues
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              {exampleTemplates.map((template, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                  <Card className="relative bg-card border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                        {template.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{template.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1 border-primary/20 text-primary">
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {template.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center p-8 bg-secondary/50 rounded-3xl border border-border/50">
                <GitBranch className="h-10 w-10 text-primary mr-4" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Ready to get started?
                  </p>
                  <p className="text-base text-muted-foreground mb-4">
                    All templates include proper YAML formatting and SEO optimization
                  </p>
                  <Button asChild size="lg" className="rounded-xl font-semibold">
                    <Link href="/generator">Generate Your Templates</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: '#ff385c' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-6xl mb-6" style={{ color: '#ffffff' }}>
              Ready to improve your project?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-12" style={{ color: '#ffffff', opacity: 0.9 }}>
              Start generating SEO-optimized issue templates with AI. Perfect for open source projects, 
              developer tools, and team repositories that want better issue management.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="h-14 px-8 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all"
              style={{ backgroundColor: '#ffffff', color: '#ff385c' }}
            >
              <Link href="/generator">
                Create Your First Template
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}