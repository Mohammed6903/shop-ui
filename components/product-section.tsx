import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteHeader } from "./site-header";
import React from "react";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: Rating;
  category: string;
}

interface ProductSectionProps {
    searchTerm?: string;
    selectedCategory?: string | null;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    quantity: number;
}

const BASE_URL = "https://fakestoreapi.com/products";

export default function ProductSection({
    searchTerm = "", 
    selectedCategory = null,
    quantity = 1,
    setQuantity
}: ProductSectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [pQuantity, setPQuantity] = useState(1);

    const fetchProducts = useCallback(async (category?: string) => {
        try {
        setIsLoading(true);
        const url = category ? `${BASE_URL}/category/${category}` : BASE_URL;
        const res = await fetch(url, {
            signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Product[] = await res.json();
        
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received");
        }

        setProducts(data);
        setFilteredProducts(data);
        setError(null);
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        console.error("Failed to fetch products:", err);
        } finally {
        setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (selectedCategory) {
        fetchProducts(selectedCategory);
        } else {
        fetchProducts();
        }
    }, [selectedCategory, fetchProducts]);

    useEffect(() => {
        if (products.length > 0) {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const handleAddToCart = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(quantity+pQuantity);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        if (pQuantity < 2){
            setQuantity(quantity+1);
        }
    };

    const incrementQuantity = () => {
        setPQuantity((prev: number) => prev + 1);
    };

    const decrementQuantity = () => {
        setPQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

  const StarRating = React.memo(({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
            aria-label="Full star"
          />
        ))}
        {hasHalfStar && (
          <div className="relative w-4 h-4" aria-label="Half star">
            <Star className="absolute w-4 h-4 text-gray-300" />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
            aria-label="Empty star"
          />
        ))}
      </div>
    );
  });

  return (
    <>
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-6 bg-orange-500" />
            <h3 className="text-sm font-medium uppercase tracking-wide">
              {selectedCategory ? selectedCategory : "All Products"}
            </h3>
          </div>
          
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-pulse">Loading products...</div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500">Error: {error}</p>
              <Button onClick={() => fetchProducts(selectedCategory ?? undefined)} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Explore Our Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="object-cover object-center w-full h-full transition-transform group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-orange-500 font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={product.rating.rate} />
                          <span className="text-sm text-muted-foreground">
                            ({product.rating.count})
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-4 transition-colors"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.title} to cart`}
                        >
                            Add To Cart
                        </Button>
                        </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Dialog open={!!selectedProduct} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProduct && (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative aspect-square">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    {selectedProduct.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={selectedProduct.rating.rate} />
                  <span className="text-sm text-muted-foreground">
                    ({selectedProduct.rating.count} Reviews)
                  </span>
                  <span className="text-sm text-green-500 ml-auto">In Stock</span>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-semibold">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Category: {selectedProduct.category}
                </p>
                <div className="flex items-center gap-2 mt-6">
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 px-2"
                            onClick={decrementQuantity}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-12 text-center">{pQuantity}</div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 px-2"
                                onClick={incrementQuantity}
                            >
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button className="flex-1" variant="default">
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
