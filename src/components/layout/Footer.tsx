import Link from 'next/link'
import { GitBranch } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30 border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">IssueGen</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate SEO-optimized GitHub issue templates with AI
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/generator" className="text-muted-foreground hover:text-primary transition-colors">Generator</Link></li>
              <li><Link href="/examples" className="text-muted-foreground hover:text-primary transition-colors">Examples</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2024 IssueGen. Built for developers, by developers.
        </div>
      </div>
    </footer>
  )
}