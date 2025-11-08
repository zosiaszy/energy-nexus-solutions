import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    message: "",
  });
  const hpRef = useRef<HTMLInputElement>(null); // honeypot

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.propertyType) {
      toast({
        variant: "destructive",
        title: "Brakuje typu nieruchomości",
        description: "Wybierz typ nieruchomości, aby kontynuować.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, hp: hpRef.current?.value || "" }),
      });

      if (res.status === 503) {
        throw new Error("Wysyłka chwilowo niedostępna – konfiguracja w toku.");
      }
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `Błąd wysyłki (HTTP ${res.status})`);
      }

      toast({ title: "Wiadomość wysłana!", description: "Skontaktujemy się z Tobą wkrótce." });
      setFormData({ name: "", phone: "", email: "", propertyType: "", message: "" });
      if (hpRef.current) hpRef.current.value = "";
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Nie udało się wysłać wiadomości",
        description: err?.message || "Spróbuj ponownie za chwilę.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* honeypot */}
                <input
                  ref={hpRef}
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                />

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
                    <SelectTrigger className="mt-2" id="propertyType">
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
                    required
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
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
                      <a href="tel:+48572722055" className="text-muted-foreground hover:text-accent transition-colors">
                        +48 572 722 055
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
                        Biuro - Zachodnia 70
                        <br />
                        90-403 Łódź
                      </p>
                    </div>
                  </div>
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
