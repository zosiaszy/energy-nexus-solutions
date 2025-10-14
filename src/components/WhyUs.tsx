import { Settings, Wallet, Leaf, Home, Zap } from "lucide-react";

const WhyUs = () => {
  const benefits = [
    {
      icon: Settings,
      title: "Kompleksowa obsługa",
      description: "Od audytu po montaż i serwis — wszystko w jednym miejscu.",
    },
    {
      icon: Wallet,
      title: "Oszczędność",
      description: "Rachunki niższe nawet o 70% dzięki naszym rozwiązaniom.",
    },
    {
      icon: Leaf,
      title: "Ekologia",
      description: "Czysta energia bez kompromisów dla przyszłości planety.",
    },
    {
      icon: Home,
      title: "Doświadczenie",
      description: "Setki zrealizowanych instalacji w całej Polsce.",
    },
    {
      icon: Zap,
      title: "Technologia",
      description: "Współpracujemy z najlepszymi markami OZE.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Twój partner w niezależności energetycznej
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Z nami zyskujesz nie tylko instalację, ale spokój i realne oszczędności.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-10 h-10 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
