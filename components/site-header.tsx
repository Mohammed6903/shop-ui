import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface HeaderProps {
  onSearch: (value: string) => void;
  onCategorySelect: (category: string | null) => void;
  quantity: number;
}

export function SiteHeader({ onSearch, onCategorySelect, quantity }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
    setIsSuggestionsOpen(value.length > 0);
  };

  const handleCategorySelect = (category: string | null) => {
    onCategorySelect(category);
    setSearchTerm(category || "");
    setIsSuggestionsOpen(false);
    if (category !== null){
        handleSearch(category);
    }
    setIsCommandOpen(false);
  };

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDB813] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <Link href="/" className="text-xl font-bold">
              Harmoni
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-base font-medium hover:text-yellow-900 transition-colors">
              Home Page
            </Link>
            <Button
              variant="ghost"
              className="text-base font-medium hover:text-yellow-900 transition-colors"
              onClick={() => setIsCommandOpen(true)}
            >
              Categories
            </Button>
            <Link href="/contact" className="text-base font-medium hover:text-yellow-900 transition-colors">
              Contact Us
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-900 transition-colors">
              <span className="text-base font-medium">More Options</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-yellow-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-6 w-6" />
            </Button>

            <div className="relative hidden lg:block w-full max-w-[300px]">
              <Input
                type="search"
                placeholder="What are you looking for?"
                className="w-full rounded-lg bg-white pr-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSuggestionsOpen(true)}
                onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)} // Delay to allow clicking suggestions
              />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              {isSuggestionsOpen && filteredCategories.length > 0 && (
                <Command className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <CommandList>
                    <CommandGroup heading="Categories">
                      {filteredCategories.map((category) => (
                        <CommandItem
                          key={category}
                          onSelect={() => handleCategorySelect(category)}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {category}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            </div>

            <Button variant="ghost" size="icon" className="hover:bg-yellow-500 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {quantity}
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-yellow-500 ml-2 min-w-9 rounded-full bg-black text-white">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="p-4 border-t border-yellow-600 lg:hidden">
            <div className="relative">
              <Input
                type="search"
                placeholder="What are you looking for?"
                className="w-full rounded-full bg-white pr-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSuggestionsOpen(true)}
                onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)}
              />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              {isSuggestionsOpen && filteredCategories.length > 0 && (
                <Command className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <CommandList>
                    <CommandGroup heading="Categories">
                      {filteredCategories.map((category) => (
                        <CommandItem
                          key={category}
                          onSelect={() => handleCategorySelect(category)}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                          {category}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            </div>
          </div>
        )}

        {isMenuOpen && (
          <nav className="lg:hidden border-t border-yellow-600">
            <div className="flex flex-col space-y-2 p-4">
              <Link
                href="/"
                className="text-base font-medium p-2 hover:bg-yellow-500 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home Page
              </Link>
              <Button
                variant="ghost"
                className="text-base font-medium p-2 hover:bg-yellow-500 rounded-md transition-colors text-left"
                onClick={() => {
                  setIsCommandOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Categories
              </Button>
              <Link
                href="/contact"
                className="text-base font-medium p-2 hover:bg-yellow-500 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex items-center justify-between p-2 hover:bg-yellow-500 rounded-md transition-colors">
                <span className="text-base font-medium">More Options</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </nav>
        )}

        <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup heading="Categories">
              <CommandItem
                onSelect={() => handleCategorySelect(null)}
                className="cursor-pointer"
              >
                All Products
              </CommandItem>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => handleCategorySelect(category)}
                  className="cursor-pointer"
                >
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
}

export default SiteHeader;