# IssueGen - GitHub Issue Template Generator

A simple, AI-powered web application that generates SEO-optimized GitHub issue templates. Built with Next.js 15, TypeScript, Tailwind CSS, and Claude AI.

## Features

- **AI-Powered Generation**: Uses Claude AI to generate professional issue templates
- **SEO Optimized**: Templates designed for discoverability and developer productivity
- **Three Template Types**: Bug reports, feature requests, and performance issues
- **YAML Format**: Proper GitHub issue template YAML formatting
- **User Authentication**: Supabase auth with Google OAuth
- **Template Management**: Save, copy, and download templates
- **Clean Design**: Stripe-inspired UI with Tailwind CSS
- **Analytics**: PostHog integration for usage tracking

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Anthropic Claude API
- **Analytics**: PostHog
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key
- Supabase project
- PostHog account (optional)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
# Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# PostHog (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL schema in `schema.sql` in your Supabase SQL editor
3. Enable Google OAuth in Supabase Auth settings (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard page
│   ├── generator/         # Template generator
│   ├── login/             # Login page
│   └── register/          # Register page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom hooks
├── lib/                  # Utilities and configs
│   └── supabase/        # Supabase client setup
└── schema.sql           # Database schema
```

## Key Features Explained

### Template Generation
- Uses Claude AI to create contextually appropriate templates
- Generates bug report, feature request, and performance issue templates
- Includes proper YAML formatting and required fields

### User Management
- Supabase Auth for user registration/login
- Google OAuth integration
- User profile management

### Template Management
- Save generated templates to database
- View all saved templates in dashboard
- Copy templates to clipboard
- Download templates as YAML files
- Delete unwanted templates

### Analytics
- Track template generations, saves, copies, downloads
- Landing page CTA tracking
- Page view analytics with PostHog

## Deployment

### Vercel
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Environment Setup
Make sure to set all required environment variables in your deployment platform.

## Contributing

This is a simple, focused project built for technical interviews. The codebase prioritizes:

- Clean, readable code
- Modern React patterns
- Proper TypeScript usage
- Component reusability
- Database best practices

## License

MIT License - feel free to use this project as a reference or starting point.