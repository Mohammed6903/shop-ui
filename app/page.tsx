"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { SiteHeader } from "@/components/site-header";
import ProductSection from "@/components/product-section";
import { HeroSection } from "@/components/hero-section";
import { DiscoverySection } from "@/components/discovery-section";
import { FeaturesSection } from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(!!term);
  };

  const handleCategorySelect = (category: string | null) => {
    console.log('Home component received category:', category);
    setSelectedCategory(category);
    setIsSearching(true);
  };

  return (
    <Provider store={store}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader
          onSearch={handleSearch}
          onCategorySelect={handleCategorySelect}
        />

        {!isSearching && (
          <>
            <HeroSection />
            <DiscoverySection />
          </>
        )}

        <ProductSection
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />

        {!isSearching && <FeaturesSection />}

        <Footer />
      </div>
    </Provider>
  );
}