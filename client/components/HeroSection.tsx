import { Zap } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary -z-10" />

      {/* Animated accent elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 -z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Premium Home Theatre Solutions
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          <span className="text-foreground">Experience Cinema</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Like Never Before
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto animate-slide-up">
          Immerse yourself in a shared virtual home-theatre experience with
          synchronized playback, surround-style audio controls, and seamless
          casting — letting everyone enjoy premium sound and crystal-clear
          visuals together from anywhere.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/50"
          >
            Get Started Today
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
          <div className="text-center animate-fade-in">
            <div className="text-2xl md:text-3xl font-bold text-primary">2</div>
            <p className="text-sm text-foreground/60 mt-1">System Tiers</p>
          </div>
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-2xl md:text-3xl font-bold text-primary">
              1000+
            </div>
            <p className="text-sm text-foreground/60 mt-1">Happy Customers</p>
          </div>
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-2xl md:text-3xl font-bold text-primary">
              24/7
            </div>
            <p className="text-sm text-foreground/60 mt-1">Expert Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
