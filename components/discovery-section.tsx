import { Button } from "@/components/ui/button"

export const DiscoverySection = () => {
    return (
        <section className="bg-black text-white py-16">
            <div className="container px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Next Favorite Item</h2>
                <p className="mb-8">Browse our exclusive collection and find the perfect product tailored just for you.</p>
                <div className="flex gap-4">
                <Button variant="secondary">Shop</Button>
                <Button variant="outline" className="bg-transparent">Learn More</Button>
                </div>
            </div>
        </section>
    )
}