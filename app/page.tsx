'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ProductSection from "@/components/product-section"
import { HeroSection } from "@/components/hero-section"
import { DiscoverySection } from "@/components/discovery-section"
import { FeaturesSection } from "@/components/features-section"
import Footer from "@/components/footer"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setIsSearching(!!term)
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    setIsSearching(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader 
        onSearch={handleSearch} 
        onCategorySelect={handleCategorySelect} 
        quantity={quantity}
      />
      
      {/* Only show Hero, Discovery, and Features sections when not searching */}
      {!isSearching && (
        <>
          <HeroSection />
          <DiscoverySection />
        </>
      )}

      {/* Products Section - Pass search and category filters */}
      <ProductSection 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* Only show Features section when not searching */}
      {!isSearching && <FeaturesSection />}
      
      <Footer />
    </div>
  )
}