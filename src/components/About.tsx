import { Target, Users, Award, DollarSign, TrendingUp, UserPlus } from "lucide-react";

const About = () => {
  return (
    <section id="o-nas" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Tworzymy domy niezależne energetycznie - z troską o planetę
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl text-muted-foreground leading-relaxed text-center">
              Nexuss to polska firma stawiająca się w źródłach energii OZE. Pomagamy obniżać rachunki za prąd, uniezależniając się od sieci budując czystszą przyszłość. Od projektu po montaż i serwis jesteśmy z Tobą na każdym etapie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Nasza misja</h3>
              <p className="text-muted-foreground">
                Być źródłem czystej energii dla każdego domu.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Nasz zespół</h3>
              <p className="text-muted-foreground">
                Jako eksperci z certyfikatami i pasją do źródeł czystej energii dla planety stawiamy na sprawdzone rozwiązania.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Jakość</h3>
              <p className="text-muted-foreground">
                Stawiamy na sprawdzone technologie i najwyższe standardy montażu.
              </p>
            </div>
          </div>

          {/* Recruitment Section */}
          <div className="mt-20 pt-12 border-t border-border">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Dołącz do naszego zespołu!
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
                Nexuss to polska firma stawiająca na dynamiczny rozwój.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Poszukujemy osób do współpracy na stanowiska: <strong>Audytor energetyczny</strong> oraz <strong>Menedżer regionu</strong>.
              </p>
              <p className="text-lg text-accent font-semibold">
                Zadzwoń i umów się na rozmowę!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Wysokie zarobki</h3>
                <p className="text-muted-foreground text-sm">
                  Atrakcyjne wynagrodzenie i system prowizyjny
                </p>
              </div>

              <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Prosta ścieżka kariery</h3>
                <p className="text-muted-foreground text-sm">
                  Jasne możliwości rozwoju i awansu
                </p>
              </div>

              <div className="text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Przyjazna atmosfera</h3>
                <p className="text-muted-foreground text-sm">
                  Zespół, który wspiera i motywuje
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
