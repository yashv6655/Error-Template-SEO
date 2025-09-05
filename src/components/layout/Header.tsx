'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GitBranch } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <GitBranch className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">IssueGen</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/generator" className="text-base font-medium text-foreground hover:text-primary transition-colors">
            Generator
          </Link>
          <Link href="/examples" className="text-base font-medium text-foreground hover:text-primary transition-colors">
            Examples
          </Link>
          <Link href="/dashboard" className="text-base font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {pathname !== '/generator' && (
            <Link 
              href="/generator" 
              className="text-base font-semibold px-6 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: '#ff385c', color: '#ffffff' }}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}