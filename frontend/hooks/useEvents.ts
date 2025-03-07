"use client"

import { useState, useEffect } from "react"
import { fetchEvents } from "@/lib/api"
import type { Event, EventsResponse, Category } from "@/types"

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])


  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true)
        const response: EventsResponse = await fetchEvents()
        
        if (!response.data || response.data.length === 0) {
          throw new Error("No events data received")
        }

        console.log("Strapi Response:", response)

        setEvents(response.data)
        setFilteredEvents(response.data)
        

        const uniqueCategories = Array.from(
          new Set(
            response.data
              .map(event => {
       
                console.log("Event:", event)
                return event.Category
              })
              .filter((category): category is string => !!category)
          )
        ).map(category => ({
          id: category.toLowerCase().replace(/\s+/g, '-'),
          name: category,
          slug: category.toLowerCase().replace(/\s+/g, '-')
        }))
        
        console.log("Extracted categories:", uniqueCategories)
        
        setCategories([
          { id: "all", name: "All", slug: "all" },
          ...uniqueCategories
        ])
        
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to fetch events. Please try again later.")
        setIsLoading(false)
      }
    }

    getEvents()
  }, [])

  
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter(event => {
        const eventCategory = (event.Category || "")
          .toLowerCase()
          .replace(/\s+/g, '-')
        console.log("Filtering:", { eventCategory, activeFilter })
        return eventCategory === activeFilter
      })
      setFilteredEvents(filtered)
    }
  }, [activeFilter, events])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  return {
    events,
    filteredEvents,
    activeFilter,
    isLoading,
    error,
    handleFilterChange,
    categories
  }
}

