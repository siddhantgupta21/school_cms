import type React from "react"
export interface Event {
  id: number
  Category: string
  Title: string
  date: string
  Description: string | null
  image: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  documentId: string
}

export interface EventsResponse {
  data: Event[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface EventCardProps {
  id: number
  title: string
  date: string
  imageUrl: string
  onClick: () => void
}

export interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  title: string
  date: string
}

export interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

