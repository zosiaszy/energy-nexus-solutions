import { Sun, Battery, Thermometer, Wind, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Sun,
      title: "Fotowoltaika i turbiny wiatrowe",
      description: "Produkuj własny prąd i oszczędzaj na rachunkach dzięki nowoczesnym instalacjom PV.",
      link: "#fotowoltaika",
    },
    {
      icon: Battery,
      title: "Magazyny energii",
      description: "Zachowaj energię na później i zyskaj niezależność od sieci.",
      link: "#magazyny",
    },
    {
      icon: Building2,
      title: "Fotowoltaika na balkon",
      description: "Lekka, nowoczesna technologia do przestrzeni miejskiej i balkonów.",
      link: "#panele-elastyczne",
    },
    {
      icon: Thermometer,
      title: "Pompy ciepła i piece pelletowe",
      description: "Ekologiczne źródła ogrzewania — komfort zimą, oszczędność przez lata.",
      link: "#pompy-ciepla",
    },
    {
      icon: Wind,
      title: "Klimatyzacja",
      description: "Nowoczesne systemy chłodzenia z niskim poborem energii.",
      link: "#klimatyzacja",
    },
  ];

  return (
    <section id="oferta" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Rozwiązania, które dają Ci niezależność energetyczną
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Od energii słonecznej po systemy grzewcze - Nexuss oferuje kompleksową obsługę energetyczną dla domu, mieszkań i firmy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="hover-lift border-border bg-card animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                    Dowiedz się więcej →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
