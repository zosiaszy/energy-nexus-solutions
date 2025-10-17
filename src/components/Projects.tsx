import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Instalacja PV 10 kWp",
      location: "Wrocław",
      type: "Fotowoltaika",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    },
    {
      title: "Pompa ciepła powietrze-woda",
      location: "Poznań",
      type: "Ogrzewanie",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    },
    {
      title: "Magazyn energii 15 kWh",
      location: "Gdańsk",
      type: "Magazyny",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    },
    {
      title: "Elastyczne panele balkonowe",
      location: "Warszawa",
      type: "Mieszkanie",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section id="realizacje" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Nasze realizacje
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Zaufali nam właściciele domów i mieszkań w całej Polsce. Zobacz jak pomagamy naszym klientom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl animate-fade-in hover-lift h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] relative h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <div className="inline-block px-3 py-1 bg-accent rounded-full text-xs font-medium mb-3">
                    {project.type}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 min-h-[3.5rem] flex items-center">{project.title}</h3>
                  <div className="flex items-center text-sm text-primary-foreground/80">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
            <a href="#kontakt">Zobacz więcej realizacji</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
