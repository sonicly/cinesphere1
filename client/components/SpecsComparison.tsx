import { useState } from "react";
import { products } from "@/data/products";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SpecsComparison() {
  const [activeTab, setActiveTab] = useState("2.1");

  const tabOptions = [
    { id: "2.1", label: "Budget" },
    { id: "5.1", label: "Mid-Range" },
    { id: "7.1", label: "Premium" },
    { id: "11.1", label: "Professional" },
  ];

  const selectedProduct = products.find((p) =>
    p.specs.setup.includes(activeTab),
  );

  const comparisonFeatures = [
    {
      category: "Audio Setup",
      items: [
        { label: "Channel Configuration", key: "setup" },
        { label: "Speaker Configuration", key: "speakers" },
        { label: "Audio Formats", key: "audioFormat" },
        { label: "Max Power Output", key: "maxPower" },
      ],
    },
    {
      category: "Installation",
      items: [
        { label: "Recommended Room Size", key: "roomSize" },
        { label: "Setup Complexity", key: "setupComplexity" },
        { label: "Calibration", key: "calibration" },
        { label: "Warranty", key: "warranty" },
      ],
    },
  ];

  const setupDetails = {
    setup: {
      "2.1": "2.1 Channel System",
      "5.1": "5.1 Channel System",
      "7.1": "7.1.2 Channel (with Atmos)",
      "11.1": "11.1.4 Channel (Fully Customizable)",
    },
    speakers: {
      "2.1": "Left + Right Speakers + Subwoofer",
      "5.1": "Front L/C/R + Side Surrounds + Subwoofer",
      "7.1":
        "Front L/C/R + Side Surrounds + Rear Surrounds + 2x Height Channels + Subwoofer",
      "11.1":
        "Triple Front Array + 4x Surrounds + 4x Heights + Dual Subwoofers",
    },
    audioFormat: {
      "2.1": "Dolby Digital, DTS",
      "5.1": "Dolby Digital, DTS, Dolby Atmos prep",
      "7.1": "Dolby Atmos, DTS:X, TrueHD",
      "11.1": "All formats including Immersive Audio",
    },
    maxPower: {
      "2.1": "300W",
      "5.1": "800W",
      "7.1": "1500W",
      "11.1": "3000W+",
    },
    roomSize: {
      "2.1": "Small to Medium (10-15 sq meters)",
      "5.1": "Medium to Large (15-30 sq meters)",
      "7.1": "Large (25-50 sq meters)",
      "11.1": "Very Large (40+ sq meters)",
    },
    setupComplexity: {
      "2.1": "Very Easy - Plug & Play",
      "5.1": "Moderate - Professional Install Recommended",
      "7.1": "Complex - Professional Install Required",
      "11.1": "Very Complex - Professional Install Included",
    },
    calibration: {
      "2.1": "Basic Calibration Tools",
      "5.1": "Automated Calibration Included",
      "7.1": "Advanced Calibration System",
      "11.1": "Professional Calibration Service",
    },
    warranty: {
      "2.1": "2-Year Limited Warranty",
      "5.1": "3-Year Limited Warranty",
      "7.1": "5-Year Full Warranty",
      "11.1": "7-Year Full + Extended Service",
    },
  };

  return (
    <section id="compare" className="w-full py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Detailed Specifications
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Compare all the technical details and features across our different
            system tiers.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2 rounded-lg font-semibold transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card text-foreground/70 hover:text-foreground border border-border/50 hover:border-primary/50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedProduct && (
          <div className="bg-card rounded-lg border border-border/50 overflow-hidden animate-fade-in">
            {/* Product Header */}
            <div className="bg-gradient-to-r from-primary/10 to-cyan-400/10 p-8 border-b border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-lg text-primary font-semibold">
                {selectedProduct.price}
              </p>
              <p className="text-foreground/70 mt-3">
                {selectedProduct.description}
              </p>
            </div>

            {/* Features Table */}
            <div className="divide-y divide-border/50">
              {comparisonFeatures.map((section) => (
                <div key={section.category}>
                  <div className="bg-background/50 px-8 py-4 border-b border-border/50">
                    <h4 className="font-semibold text-foreground">
                      {section.category}
                    </h4>
                  </div>
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="px-8 py-4 border-b border-border/50 last:border-b-0 hover:bg-background/30 transition-colors duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <span className="text-foreground/80 font-medium">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground font-medium">
                            {setupDetails[
                              item.key as keyof typeof setupDetails
                            ][
                              activeTab as keyof (typeof setupDetails)[keyof typeof setupDetails]
                            ] || "Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="px-8 py-8 bg-background/50 border-t border-border/50">
              <h4 className="font-semibold text-foreground mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
