import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michał",
      location: "Warszawa",
      rating: 5,
      text: "Profesjonalny montaż i realne oszczędności. Moje rachunki spadły o połowę!",
    },
    {
      name: "Katarzyna",
      location: "Gdynia",
      rating: 5,
      text: "Elastyczne panele na balkonie to hit! W końcu mam własną energię w mieszkaniu.",
    },
    {
      name: "Adam",
      location: "Poznań",
      rating: 5,
      text: "Pompa ciepła działa świetnie, a ekipa Nexuss ogarnęła wszystko od A do Z.",
    },
  ];

  return (
    <section id="opinie" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Co mówią o nas nasi klienci
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border bg-card hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-energy text-energy" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
