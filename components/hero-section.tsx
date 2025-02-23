export const HeroSection = () => {
    return (
        <section className="relative">
            <div className="grid grid-cols-2 min-h-[600px]">
                <div className="bg-white h-full" />
                <div className="bg-[#FFF599] h-full" />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="max-w-2xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Welcome to <span className="underline decoration-2">My Store</span>
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">
                            Your Shopping Destination
                        </h2>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto">
                            Discover a wide range of products tailored just for you. Shop with ease and find exactly what you need.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;