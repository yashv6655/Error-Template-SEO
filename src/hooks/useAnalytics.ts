'use client'

import { usePostHog } from 'posthog-js/react'

export const useAnalytics = () => {
  const posthog = usePostHog()

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture(event, properties)
    }
  }

  const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        page_name: pageName,
        ...properties,
      })
    }
  }

  const trackTemplateGeneration = (projectType: string) => {
    trackEvent('template_generated', {
      project_type: projectType,
    })
  }

  const trackTemplateSave = (projectType: string) => {
    trackEvent('template_saved', {
      project_type: projectType,
    })
  }

  const trackTemplateCopy = (templateType: string) => {
    trackEvent('template_copied', {
      template_type: templateType,
    })
  }

  const trackTemplateDownload = (templateType: string) => {
    trackEvent('template_downloaded', {
      template_type: templateType,
    })
  }

  const trackLandingCTA = (action: string) => {
    trackEvent('landing_cta_click', {
      action,
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackTemplateGeneration,
    trackTemplateSave,
    trackTemplateCopy,
    trackTemplateDownload,
    trackLandingCTA,
  }
}