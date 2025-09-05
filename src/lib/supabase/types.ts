export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      issue_templates: {
        Row: {
          id: string
          user_id: string
          project_name: string
          project_description: string
          project_type: string
          bug_template: string
          feature_template: string
          performance_template: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_name: string
          project_description: string
          project_type: string
          bug_template: string
          feature_template: string
          performance_template: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_name?: string
          project_description?: string
          project_type?: string
          bug_template?: string
          feature_template?: string
          performance_template?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}