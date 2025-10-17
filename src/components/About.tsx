import { Target, Users, Award } from "lucide-react";

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
              Nexuss to polska firma specjalizująca się w odnawialnych źródłach energii OZE. Pomagamy obniżać rachunki za prąd, uniezależniać się od sieci i budować czystszą przyszłość. Od projektu po montaż i serwis - jesteśmy z Tobą na każdym etapie.
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
                Eksperci z certyfikatami i pasją do energii odnawialnej.
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
        </div>
      </div>
    </section>
  );
};

export default About;
