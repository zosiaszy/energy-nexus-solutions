import { ArrowRight, Sun, Waves, Battery, Wind, Home, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Nowoczesny dom z panelami fotowoltaicznymi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Nexuss to kompleksowe rozwiązania OZE!
          </h1>
          <div className="text-base sm:text-lg text-white/90 mb-8 max-w-xl">
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Fotowoltaika</span>
              </li>
              <li className="flex items-center gap-3">
                <Waves className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Pompy ciepła</span>
              </li>
              <li className="flex items-center gap-3">
                <Battery className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Inteligentne magazyny energii</span>
              </li>
              <li className="flex items-center gap-3">
                <Wind className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Turbiny wiatrowe</span>
              </li>
              <li className="flex items-center gap-3">
                <Home className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Elastyczne panele balkonowe</span>
              </li>
              <li className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Piece na pellet</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 group" asChild>
              <a href="#kontakt">
                Umów bezpłatną wycenę
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-accent mb-2">1500+</div>
              <div className="text-white/80 text-sm">Zadowolonych klientów</div>
            </div>
            <div className="animate-fade-in" style={{
            animationDelay: "0.1s"
          }}>
              <div className="text-4xl font-bold text-accent mb-2">Do 95%</div>
              <div className="text-white/80 text-sm">Redukcja rachunków</div>
            </div>
            <div className="animate-fade-in col-span-2 md:col-span-1" style={{
            animationDelay: "0.2s"
          }}>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-white/80 text-sm">Lat doświadczenia</div>
            </div>
          </div>
        </div>
      </div>

    </section>;
};
export default Hero;