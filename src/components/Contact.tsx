import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    honeypot: "", // Hidden field for spam protection
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Imię i nazwisko jest wymagane (minimum 2 znaki)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Podaj poprawny adres e-mail";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Wiadomość musi mieć minimum 10 znaków";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Błąd walidacji",
        description: "Proszę poprawić błędy w formularzu",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim(),
          honeypot: formData.honeypot,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Dziękujemy!",
          description: "Formularz został wysłany. Skontaktujemy się z Tobą jak najszybciej.",
        });
        setFormData({ name: "", phone: "", email: "", message: "", honeypot: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        throw new Error(data?.error || "Wystąpił błąd podczas wysyłania formularza");
      }
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        variant: "destructive",
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
              Skontaktuj się z nami, aby otrzymać wycenę instalacji OZE. Doradzimy, jakie rozwiązanie - fotowoltaika, pompa ciepła lub magazyn energii najlepiej sprawdzi się w Twoim domu lub firmie. Zadzwoń lub napisz i zacznij oszczędzać z energią przyszłości.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Wiadomość *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      setErrors({ ...errors, message: "" });
                    }}
                    rows={6}
                    className={`mt-2 ${errors.message ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
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
                      <a href="mailto:kontakt@nexuss.com.pl" className="text-muted-foreground hover:text-accent transition-colors">
                        kontakt@nexuss.com.pl
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
                        ul. Słoneczna 123<br />
                        00-001 Warszawa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="font-medium text-foreground mb-3">Godziny otwarcia</div>
                  <p className="text-muted-foreground">
                    Pn - Pt: 8:00 - 18:00<br />
                    Sobota: 9:00 - 14:00
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                <p className="text-accent font-medium text-center">
                  ⚡ Oddzwonimy w ciągu 24 godzin!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
