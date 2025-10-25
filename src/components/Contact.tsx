import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Wiadomość wysłana!",
      description: "Skontaktujemy się z Tobą wkrótce.",
    });
    setFormData({ name: "", phone: "", email: "", propertyType: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Zrób pierwszy krok do niezależności energetycznej
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Skontaktuj się z nami, aby otrzymać wycenę instalacji OZE. Doradzimy, jakie rozwiązanie - fotowoltaika,
              pompa ciepła lub magazyn energii najlepiej sprawdzi się w Twoim domu lub firmie. Zadzwoń lub napisz i
              zacznij oszczędzać z energią przyszłości.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="propertyType">Typ nieruchomości</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Wybierz typ" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="dom">Dom jednorodzinny</SelectItem>
                      <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                      <SelectItem value="firma">Firma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Twoja wiadomość</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Wyślij wiadomość
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Dane kontaktowe</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Telefon</div>
                      <a href="tel:+48123456789" className="text-muted-foreground hover:text-accent transition-colors">
                        +48 123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">E-mail</div>
                      <a
                        href="mailto:kontakt@nexuss.pl"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        kontakt@nexuss.pl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Adres</div>
                      <p className="text-muted-foreground">
                        ul. Słoneczna 123
                        <br />
                        00-001 Warszawa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="font-medium text-foreground mb-3">Godziny otwarcia</div>
                  <p className="text-muted-foreground">
                    Pn - Pt: 8:00 - 18:00
                    <br />
                    Sobota: 9:00 - 14:00
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                <p className="text-accent font-medium text-center">⚡ Oddzwonimy w ciągu 24 godzin!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
