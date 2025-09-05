'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Copy, Download, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface FormData {
  projectName: string
  projectDescription: string
  projectType: string
}

interface GeneratedTemplates {
  bugTemplate: string
  featureTemplate: string
  performanceTemplate: string
}

export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    projectType: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [templates, setTemplates] = useState<GeneratedTemplates | null>(null)
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createClient()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.trackPageView('Generator Page')
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const projectTypes = [
    { value: 'library', label: 'Library' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'cli-tool', label: 'CLI Tool' },
    { value: 'api', label: 'API/Backend' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'desktop-app', label: 'Desktop App' }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isStepValid = () => {
    return formData.projectName.trim() && 
           formData.projectDescription.trim() && 
           formData.projectType
  }

  const generateTemplates = async () => {
    setIsGenerating(true)
    setCurrentStep(3)
    
    try {
      const response = await fetch('/api/generate-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          projectType: formData.projectType,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate templates')
      }
      
      const generatedTemplates: GeneratedTemplates = await response.json()
      setTemplates(generatedTemplates)
      analytics.trackTemplateGeneration(formData.projectType)
    } catch (error) {
      console.error('Error generating templates:', error)
      // Fallback to mock templates in case of API error
      const mockTemplates: GeneratedTemplates = {
        bugTemplate: `name: 🐛 Bug Report
description: Report a bug in ${formData.projectName}
title: "[BUG] "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report for ${formData.projectName}!
  
  - type: textarea
    id: bug-description
    attributes:
      label: Bug Description
      description: A clear description of what the bug is
      placeholder: Describe the bug...
    validations:
      required: true`,
        featureTemplate: `name: ✨ Feature Request
description: Suggest a feature for ${formData.projectName}
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for suggesting a feature for ${formData.projectName}!`,
        performanceTemplate: `name: ⚡ Performance Issue
description: Report a performance issue in ${formData.projectName}
title: "[PERFORMANCE] "
labels: ["performance", "bug"]
body:
  - type: markdown
    attributes:
      value: |
        Performance issues help us make ${formData.projectName} faster for everyone!`
      }
      setTemplates(mockTemplates)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (template: string, templateName: string) => {
    await navigator.clipboard.writeText(template)
    setCopiedTemplate(templateName)
    setTimeout(() => setCopiedTemplate(null), 2000)
    analytics.trackTemplateCopy(templateName)
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

  const saveTemplate = async () => {
    if (!user || !templates) return

    setIsSaving(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('issue_templates')
        .insert({
          user_id: user.id,
          project_name: formData.projectName,
          project_description: formData.projectDescription,
          project_type: formData.projectType,
          bug_template: templates.bugTemplate,
          feature_template: templates.featureTemplate,
          performance_template: templates.performanceTemplate,
        })

      if (error) throw error
      
      // Show success feedback
      alert('Template saved successfully!')
      analytics.trackTemplateSave(formData.projectType)
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Failed to save template. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Project Details</CardTitle>
              <CardDescription>
                Tell us about your project to generate customized issue templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="e.g., React Dashboard Library"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Brief description of your project (2-3 sentences)"
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setCurrentStep(2)} 
                  disabled={!isStepValid()}
                  className="w-full sm:w-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Review & Generate</CardTitle>
              <CardDescription>
                Review your project details and generate issue templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Project Name</Label>
                  <p className="text-lg">{formData.projectName}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-gray-600">{formData.projectDescription}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <Badge variant="outline" className="ml-2">
                    {projectTypes.find(t => t.value === formData.projectType)?.label}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Templates to Generate:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Bug Report Template</li>
                  <li>• Feature Request Template</li>
                  <li>• Performance Issue Template</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={generateTemplates}>
                  Generate Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        if (isGenerating) {
          return (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Generating Templates...</h3>
                <p className="text-gray-600">
                  Creating SEO-optimized issue templates for {formData.projectName}
                </p>
              </CardContent>
            </Card>
          )
        }

        if (templates) {
          const templateData = [
            { 
              name: 'Bug Report', 
              content: templates.bugTemplate, 
              filename: 'bug_report.yml',
              description: 'Template for reporting bugs and issues'
            },
            { 
              name: 'Feature Request', 
              content: templates.featureTemplate, 
              filename: 'feature_request.yml',
              description: 'Template for requesting new features'
            },
            { 
              name: 'Performance Issue', 
              content: templates.performanceTemplate, 
              filename: 'performance_issue.yml',
              description: 'Template for reporting performance problems'
            }
          ]

          return (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Your Templates Are Ready!</h2>
                <p className="text-gray-600">
                  Copy the templates below or download them as YAML files
                </p>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-1">
                {templateData.map((template, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(template.content, template.name)}
                          >
                            {copiedTemplate === template.name ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadTemplate(template.content, template.filename)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-x-auto max-h-96 overflow-y-auto">
                        <code>{template.content}</code>
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center space-x-4">
                {user && (
                  <Button 
                    onClick={saveTemplate}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Templates'}
                  </Button>
                )}
                <Button onClick={() => {
                  setCurrentStep(1)
                  setTemplates(null)
                  setFormData({
                    projectName: '',
                    projectDescription: '',
                    projectType: ''
                  })
                }} variant="outline">
                  Generate New Templates
                </Button>
              </div>
            </div>
          )
        }

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Issue Template Generator
          </h1>
          {currentStep < 3 && (
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${
                currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${
                currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
          )}
        </div>
        
        {renderStep()}
      </div>
    </div>
  )
}