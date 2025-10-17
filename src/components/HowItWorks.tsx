import { Search, FileText, Wrench, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Bezpłatny audyt energetyczny",
      description: "Analizujemy Twój dom i dobieramy najlepsze rozwiązanie.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Projekt i wycena",
      description: "Przejrzysty kosztorys bez ukrytych opłat.",
    },
    {
      number: "03",
      icon: Wrench,
      title: "Profesjonalny montaż",
      description: "Zespół certyfikowanych instalatorów Nexuss.",
    },
    {
      number: "04",
      icon: Activity,
      title: "Monitoring i serwis",
      description: "Dbamy o to, by Twoja instalacja działała bezawaryjnie przez lata.",
    },
  ];

  return (
    <section className="py-20 bg-background text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-energy rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prosty proces, realne efekty
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Cztery kroki do Twojej energetycznej niezależności
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connection line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-accent/30"></div>
                )}

                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-all hover-lift h-full flex flex-col">
                  <div className="text-6xl font-bold text-accent/60 mb-4">{step.number}</div>
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 min-h-[3.5rem] text-white">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6" asChild>
            <a href="#kontakt">Zamów audyt za 0 zł</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
