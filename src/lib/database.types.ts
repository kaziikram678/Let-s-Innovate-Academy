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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: string
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: string
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          id: string
          course_slug: string
          course_title: string
          full_name: string
          phone: string
          email: string
          transaction_id: string
          bkash_number: string
          message: string | null
          status: string
          created_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          course_slug: string
          course_title: string
          full_name: string
          phone: string
          email: string
          transaction_id: string
          bkash_number: string
          message?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          course_slug?: string
          course_title?: string
          full_name?: string
          phone?: string
          email?: string
          transaction_id?: string
          bkash_number?: string
          message?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          description: string | null
          status: string
          price: number
          old_price: number | null
          duration: string | null
          lectures_count: number | null
          image_url: string | null
          features: Json
          learnings: Json
          who_for: Json
          curriculum: Json
          faqs: Json
          instructor_slug: string | null
          language: string | null
          support: string | null
          payment_method: string | null
          class_format: string | null
          class_schedule: string | null
          email_notifications: boolean | null
          students_count: number | null
          rating: number | null
          start_date: string | null
          end_date: string | null
          meeting_link: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          description?: string | null
          status?: string
          price?: number
          old_price?: number | null
          duration?: string | null
          lectures_count?: number | null
          image_url?: string | null
          features?: Json
          learnings?: Json
          who_for?: Json
          curriculum?: Json
          faqs?: Json
          instructor_slug?: string | null
          language?: string | null
          support?: string | null
          payment_method?: string | null
          class_format?: string | null
          class_schedule?: string | null
          email_notifications?: boolean | null
          students_count?: number | null
          rating?: number | null
          start_date?: string | null
          end_date?: string | null
          meeting_link?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          status?: string
          price?: number
          old_price?: number | null
          duration?: string | null
          lectures_count?: number | null
          image_url?: string | null
          features?: Json
          learnings?: Json
          who_for?: Json
          curriculum?: Json
          faqs?: Json
          instructor_slug?: string | null
          language?: string | null
          support?: string | null
          payment_method?: string | null
          class_format?: string | null
          class_schedule?: string | null
          email_notifications?: boolean | null
          students_count?: number | null
          rating?: number | null
          start_date?: string | null
          end_date?: string | null
          meeting_link?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      course_materials: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          material_type: string
          file_url: string
          file_size: number | null
          duration: string | null
          day_number: number | null
          lesson_order: number | null
          is_preview: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          material_type: string
          file_url: string
          file_size?: number | null
          duration?: string | null
          day_number?: number | null
          lesson_order?: number | null
          is_preview?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          material_type?: string
          file_url?: string
          file_size?: number | null
          duration?: string | null
          day_number?: number | null
          lesson_order?: number | null
          is_preview?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isRelationary: false
            referencedRelation: "courses"
            referencedTable: "courses"
          }
        ]
      }
      email_templates: {
        Row: {
          id: string
          name: string
          subject: string
          body: string
          type: string
          variables: Json
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          subject: string
          body: string
          type: string
          variables?: Json
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          body?: string
          type?: string
          variables?: Json
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emails: {
        Row: {
          id: string
          template_id: string | null
          recipient_email: string
          recipient_name: string | null
          subject: string
          body: string
          type: string
          course_id: string | null
          enrollment_id: string | null
          status: string
          sent_at: string | null
          error_message: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          template_id?: string | null
          recipient_email: string
          recipient_name?: string | null
          subject: string
          body: string
          type: string
          course_id?: string | null
          enrollment_id?: string | null
          status?: string
          sent_at?: string | null
          error_message?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          template_id?: string | null
          recipient_email?: string
          recipient_name?: string | null
          subject?: string
          body?: string
          type?: string
          course_id?: string | null
          enrollment_id?: string | null
          status?: string
          sent_at?: string | null
          error_message?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emails_template_id_fkey"
            columns: ["template_id"]
            isRelationary: false
            referencedRelation: "email_templates"
            referencedTable: "email_templates"
          },
          {
            foreignKeyName: "emails_course_id_fkey"
            columns: ["course_id"]
            isRelationary: false
            referencedRelation: "courses"
            referencedTable: "courses"
          },
          {
            foreignKeyName: "emails_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isRelationary: false
            referencedRelation: "enrollments"
            referencedTable: "enrollments"
          }
        ]
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
  }
}
