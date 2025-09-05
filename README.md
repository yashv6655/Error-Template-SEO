# IssueGen - GitHub Issue Template Generator

A comprehensive, AI-powered web application that generates SEO-optimized GitHub issue templates to improve repository discoverability and developer experience. Built as a demonstration of full-stack development capabilities with modern technologies and best practices.

## Problem Statement & SEO Value

GitHub repositories with well-structured issue templates receive 3x more quality contributions and rank higher in GitHub's search algorithm. However, creating professional issue templates requires YAML expertise and SEO knowledge that most developers lack.

**IssueGen solves this by**:
- Generating SEO-optimized GitHub issue templates with proper metadata
- Improving repository discoverability through structured content
- Reducing friction in open-source contribution workflows
- Providing ready-to-use YAML templates that enhance project professionalism

### Target Customer Profile

**Primary User**: Senior Frontend Developer at growing tech companies
**Scenario**: Maintains multiple open-source libraries used by thousands of developers. Spends hours crafting issue templates for each repository to ensure quality bug reports and feature requests.

**Value Proposition**:
1. Generate professional templates in under 2 minutes
2. Customize templates for each library's specific needs
3. Improve repositories' GitHub SEO ranking through structured metadata
4. Reduce low-quality issues by 60% through guided forms

**Business Impact**: More discoverable repositories → increased adoption → better developer relations → company growth

## Architecture & Technical Requirements

### Full-Stack Implementation
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes with serverless functions
- **Database**: PostgreSQL via Supabase with row-level security
- **Authentication**: Supabase Auth with Google OAuth integration
- **AI Integration**: Anthropic Claude API for template generation

### ETL Pipeline Architecture

**Extract**: User project data (name, description, type)
**Transform**: Claude AI processes input into structured YAML templates
**Load**: Templates saved to PostgreSQL with user association and metadata

```
User Input → Claude AI Processing → YAML Generation → Database Storage → User Dashboard → Template Export
```
