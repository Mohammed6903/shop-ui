import { Button } from "@/components/ui/button"

export const FeaturesSection = () => {
    return (
        <section className="py-16 border-t">
            <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <span className="text-white">🚚</span>
                </div>
                <h3 className="font-bold mb-2">FREE AND FAST DELIVERY</h3>
                <p className="text-sm text-muted-foreground">Free delivery for all orders over $140</p>
                </div>
                <div>
                <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <span className="text-white">💬</span>
                </div>
                <h3 className="font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
                <p className="text-sm text-muted-foreground">Friendly 24/7 customer support</p>
                </div>
                <div>
                <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <span className="text-white">✓</span>
                </div>
                <h3 className="font-bold mb-2">MONEY BACK GUARANTEE</h3>
                <p className="text-sm text-muted-foreground">We return money within 30 days</p>
                </div>
            </div>
            </div>
        </section>
    )
}