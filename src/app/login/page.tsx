import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white flex items-center justify-center py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your saved templates and dashboard
          </p>
        </div>
        
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}