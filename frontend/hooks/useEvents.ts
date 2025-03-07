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

  // Fetch all events on component mount
  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true)
        const response: EventsResponse = await fetchEvents()
        
        if (!response.data || response.data.length === 0) {
          throw new Error("No events data received")
        }

        // Log the response to see the actual data structure
        console.log("Strapi Response:", response)

        setEvents(response.data)
        setFilteredEvents(response.data)
        
        // Extract unique categories from events
        const uniqueCategories = Array.from(
          new Set(
            response.data
              .map(event => {
                // Log each event to see its structure
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
        
        // Add "All" category at the beginning
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

  // Filter events when activeFilter changes
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

  // Function to change the active filter
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

