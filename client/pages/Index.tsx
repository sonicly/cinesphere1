import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Volume2, Zap, Award } from "lucide-react";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Redirect to lobby if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/lobby" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onGetStarted={() => setIsLoginOpen(true)} />

      {/* Hero Section */}
      <HeroSection onGetStarted={() => setIsLoginOpen(true)} />

      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Systems?
            </h2>
            <p className="text-lg text-foreground/70">
              Premium quality, expert support, and systems designed for your
              home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Volume2,
                title: "Immersive Sound",
                description:
                  "Experience multi-channel audio with precision engineering for every frequency band.",
              },
              {
                icon: Zap,
                title: "Without Hardware",
                description:
                  "Enjoy a theatre-like experience without any extra hardware — everything runs virtually using your existing devices.",
              },
              {
                icon: Award,
                title: "Expert Support",
                description:
                  "Professional installation and 24/7 customer support to ensure perfect setup.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Ready to Transform Your Home Theatre?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 animate-fade-in">
            Get in touch with our experts today to discuss your home theatre
            needs and find the perfect system for your space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/50">
              Schedule Consultation
            </button>
            <button className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
              View Pricing
            </button>
          </div>

          {/* Contact Methods */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-foreground/60 mb-4">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+918007702377"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
              >
                📞 +91 8007702377
              </a>
              <a
                href="mailto:Sonicly123@Gmail.com"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
              >
                <p>📧 Sonicly123@Gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
