import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-display font-bold text-xl">Reinsure</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Trusted insurance advisory firm providing tailored coverage solutions
              for vehicles and businesses across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About Us", "Why Choose Us", "FAQs", "Contact"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() =>
                      scrollTo(`#${l.toLowerCase().replace(/\s+/g, "-").replace("us", "us")}`)
                    }
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Commercial Vehicle Insurance</li>
              <li>Third Party Coverage</li>
              <li>Comprehensive Plans</li>
              <li>EMI & Part Payment</li>
              <li>Claim Assistance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 mt-0.5 text-accent" />
                +91 98222 10941
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 mt-0.5 text-accent" />
                rensureinsurance@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                Office No. 203, 2204, Velstand, Mundhawa Kharadi Road, Tukaram Nagar, Opposite Reliance Mart, Kharadi, Haaveli, Pune - 411014
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Reinsure Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
