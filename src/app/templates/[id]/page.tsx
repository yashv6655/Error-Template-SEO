'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Copy, Download, Check, Calendar } from 'lucide-react'
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

export default function TemplateDetailsPage() {
  const params = useParams()
  const [template, setTemplate] = useState<Template | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const supabase = createClient()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.trackPageView('Template Details')
    if (params.id) {
      loadTemplate(params.id as string)
    }
  }, [params.id])

  const loadTemplate = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('issue_templates')
        .select('*')
        .eq('id', templateId)
        .single()
      
      if (error) throw error
      setTemplate(data)
    } catch (error) {
      console.error('Error loading template:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (templateContent: string, templateName: string) => {
    await navigator.clipboard.writeText(templateContent)
    setCopiedTemplate(templateName)
    setTimeout(() => setCopiedTemplate(null), 2000)
    analytics.trackTemplateCopy(templateName)
  }

  const downloadTemplate = (templateContent: string, filename: string) => {
    const blob = new Blob([templateContent], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    analytics.trackTemplateDownload(filename.replace('.yml', ''))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading template...</div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-16">
            <h2 className="text-2xl font-semibold mb-4">Template not found</h2>
            <p className="text-gray-600 mb-6">
              The template you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const templateData = [
    { 
      name: 'Bug Report', 
      content: template.bug_template, 
      filename: 'bug_report.yml',
      description: 'Template for reporting bugs and issues',
      icon: '🐛'
    },
    { 
      name: 'Feature Request', 
      content: template.feature_template, 
      filename: 'feature_request.yml',
      description: 'Template for requesting new features',
      icon: '✨'
    },
    { 
      name: 'Performance Issue', 
      content: template.performance_template, 
      filename: 'performance_issue.yml',
      description: 'Template for reporting performance problems',
      icon: '⚡'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{template.project_name}</h1>
              <p className="text-gray-600 mb-4">{template.project_description}</p>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  {template.project_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Created {new Date(template.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="grid gap-6">
          {templateData.map((templateItem, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{templateItem.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{templateItem.name}</CardTitle>
                      <CardDescription>{templateItem.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(templateItem.content, templateItem.name)}
                    >
                      {copiedTemplate === templateItem.name ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="ml-2 hidden sm:inline">Copy</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadTemplate(templateItem.content, templateItem.filename)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-md p-4">
                  <pre className="text-xs overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                    <code>{templateItem.content}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/generator">
              Generate New Templates
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}