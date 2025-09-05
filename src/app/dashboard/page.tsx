'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, ExternalLink, Copy, Download, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'

interface Template {
  id: string
  project_name: string
  project_description: string
  project_type: string
  bug_template: string
  feature_template: string
  performance_template: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.trackPageView('Dashboard')
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        loadTemplates(user.id)
      } else {
        window.location.href = '/login'
      }
    }
    
    getUser()
  }, [])

  const loadTemplates = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('issue_templates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('issue_templates')
        .delete()
        .eq('id', templateId)
      
      if (error) throw error
      setTemplates(templates.filter(t => t.id !== templateId))
    } catch (error) {
      console.error('Error deleting template:', error)
    }
  }

  const copyToClipboard = async (template: string, templateType: string) => {
    await navigator.clipboard.writeText(template)
    analytics.trackTemplateCopy(templateType)
  }

  const downloadTemplate = (template: string, filename: string) => {
    const blob = new Blob([template], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    analytics.trackTemplateDownload(filename.replace('.yml', ''))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.user_metadata?.full_name || user.email}</p>
          </div>
          <div className="flex space-x-3">
            <Button asChild>
              <Link href="/generator">
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Link>
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {templates.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">No templates yet</h2>
              <p className="text-gray-600 mb-6">
                Create your first GitHub issue template to get started
              </p>
              <Button asChild>
                <Link href="/generator">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{template.project_name}</CardTitle>
                      <CardDescription className="mt-2">
                        {template.project_description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {template.project_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(template.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <h4 className="font-medium">Available Templates:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <span className="text-sm">🐛 Bug Report</span>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(template.bug_template, 'Bug Report')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => downloadTemplate(template.bug_template, 'bug_report.yml')}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <span className="text-sm">✨ Feature Request</span>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(template.feature_template, 'Feature Request')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => downloadTemplate(template.feature_template, 'feature_request.yml')}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <span className="text-sm">⚡ Performance Issue</span>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(template.performance_template, 'Performance Issue')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => downloadTemplate(template.performance_template, 'performance_issue.yml')}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/templates/${template.id}`}>
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View Details
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}