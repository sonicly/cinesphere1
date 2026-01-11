import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductShowcase() {
  return (
    <section id="products" className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect System
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From budget-friendly options to professional-grade installations, we
            have the perfect home theatre solution for your needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 md:p-12 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/5 to-cyan-400/5 animate-fade-in">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Not Sure Which System Is Right for You?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Our experts are here to help you find the perfect configuration
              based on your room size, budget, and audio preferences.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              Get Expert Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
