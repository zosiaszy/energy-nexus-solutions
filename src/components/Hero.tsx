import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Nowoczesny dom z panelami fotowoltaicznymi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Twój dom. Twoja energia.<br />Twoje ciepło.
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl leading-relaxed">
            Nexuss to kompleksowe rozwiązania OZE! ● Fotowoltaika ● pompy ciepła ● inteligentne magazyny energii ● Turbiny wiatrowe ● elastyczne panele balkonowe ● piece na pellet! Montaż oraz dofinansowania!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 group"
              asChild
            >
              <a href="#kontakt">
                Umów darmową wycenę
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-white/80 text-sm">Zadowolonych klientów</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-accent mb-2">Do 95%</div>
              <div className="text-white/80 text-sm">Redukcja rachunków</div>
            </div>
            <div className="animate-fade-in col-span-2 md:col-span-1" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-white/80 text-sm">Lat doświadczenia</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
