import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Star } from "lucide-react";

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
}

interface ProductCartModalProps {
  selectedProduct: Product | null;
  quantity: number;
  onClose: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

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

const ProductCartModal: React.FC<ProductCartModalProps> = ({
    selectedProduct,
    quantity,
    onClose,
    onIncrement,
    onDecrement,
}) => {
    return (
        <Dialog open={!!selectedProduct} onOpenChange={onClose}>
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
                                {selectedProduct.title}
                            </p>
                            <div className="flex items-center gap-2 mt-6">
                                <div className="flex items-center border rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 px-2"
                                        onClick={onDecrement}
                                    >
                                    <Minus className="h-4 w-4" />
                                    </Button>
                                    <div className="w-12 text-center">{quantity}</div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 px-2"
                                        onClick={onIncrement}
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
    );
};

export default ProductCartModal;