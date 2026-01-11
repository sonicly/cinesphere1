import { Product } from "@/data/products";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryColors = {
    budget: "border-cyan-400/30",
    "mid-range": "border-cyan-400/50",
    premium: "border-cyan-400/70",
    professional: "border-primary",
  };

  const badgeColors = {
    budget: "bg-cyan-400/10 text-cyan-300",
    "mid-range": "bg-cyan-400/20 text-cyan-300",
    premium: "bg-primary/10 text-primary",
    professional: "bg-primary/30 text-primary",
  };

  return (
    <div
      className="h-full animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={cn(
          "h-full rounded-lg border transition-all duration-300 overflow-hidden",
          "bg-card hover:shadow-lg hover:shadow-primary/20",
          "transform hover:-translate-y-1 group",
          categoryColors[product.category],
        )}
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Category Badge */}
          <div
            className={cn(
              "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold",
              badgeColors[product.category],
            )}
          >
            {product.category === "budget"
              ? "Budget"
              : product.category === "mid-range"
                ? "Mid-Range"
                : product.category === "premium"
                  ? "Premium"
                  : "Professional"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Title and Price */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {product.name}
            </h3>
            <p className="text-lg font-semibold text-primary">
              {product.price}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/70 mb-4">
            {product.description}
          </p>

          {/* Key Specs */}
          <div className="mb-4 space-y-2 flex-grow">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/60">Setup</p>
                <p className="text-sm font-medium text-foreground">
                  {product.specs.setup}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/60">Max Power</p>
                <p className="text-sm font-medium text-foreground">
                  {product.specs.maxPower}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/60">Room Size</p>
                <p className="text-sm font-medium text-foreground">
                  {product.specs.roomSize}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className={cn(
              "w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300",
              "flex items-center justify-center gap-2",
              "group/btn",
              product.category === "professional"
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50",
            )}
          >
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
