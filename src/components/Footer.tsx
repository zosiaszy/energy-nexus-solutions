import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import nexussLogo from "@/assets/nexuss-logo-new.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={nexussLogo} 
                alt="Nexuss Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold">Nexuss</span>
            </div>
            <p className="text-primary-foreground/70 mb-4 max-w-md">
              Kompleksowe rozwiązania OZE dla Twojego domu. Fotowoltaika, pompy ciepła, 
              magazyny energii i klimatyzacja.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:kontakt@nexuss.com.pl" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              <li><a href="#oferta" className="text-primary-foreground/70 hover:text-accent transition-colors">Oferta</a></li>
              <li><a href="#o-nas" className="text-primary-foreground/70 hover:text-accent transition-colors">O nas</a></li>
              <li><a href="#realizacje" className="text-primary-foreground/70 hover:text-accent transition-colors">Realizacje</a></li>
              <li><a href="#opinie" className="text-primary-foreground/70 hover:text-accent transition-colors">Opinie</a></li>
              <li><a href="#kontakt" className="text-primary-foreground/70 hover:text-accent transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Partnerzy</h3>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>Huawei</li>
              <li>LG</li>
              <li>Viessmann</li>
              <li>Fronius</li>
              <li>SolarEdge</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>© {currentYear} Nexuss. Wszystkie prawa zastrzeżone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Polityka prywatności</a>
              <a href="#" className="hover:text-accent transition-colors">Regulamin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
