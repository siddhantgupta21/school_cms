"use client"

import type React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import FilterSection from "@/components/sections/filter-section"
import GallerySection from "@/components/sections/gallery-section"
import { useEvents } from "@/hooks/useEvents"

const EventsPage: React.FC = () => {
  const { filteredEvents, activeFilter, isLoading, error, handleFilterChange, categories } = useEvents()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FilterSection 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      {error && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      )}

      <GallerySection events={filteredEvents} isLoading={isLoading} />
      <Footer />
    </div>
  )
}

export default EventsPage

