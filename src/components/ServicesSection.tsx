import { Car, CreditCard, HeadphonesIcon, Home, Shield, Wrench } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Commercial Vehicle Insurance",
    desc: "Third party, comprehensive coverage, and owner-driver personal accident plans for all commercial vehicles.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment & EMI",
    desc: "Part payment and EMI options so you can get covered without financial strain.",
  },
  {
    icon: HeadphonesIcon,
    title: "Fast Claim Assistance",
    desc: "Quick claim support via WhatsApp and phone — we're always just a message away.",
  },
  {
    icon: Home,
    title: "Home & Vehicle Support",
    desc: "Doorstep service assistance and roadside support whenever you need it.",
  },
  {
    icon: Shield,
    title: "Custom Insurance Plans",
    desc: "Tailored plans for business owners with personal risk assessments and expert advice.",
  },
  {
    icon: Wrench,
    title: "Renewal & Policy Management",
    desc: "Hassle-free renewals, policy tracking, and document management all in one place.",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding section-alt">
    <div className="container-max">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          What We Offer
        </p>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
          Comprehensive Insurance Plans Built For You
        </h2>
        <p className="text-muted-foreground text-lg">
          From commercial vehicles to personalised business coverage — we have a
          plan for every need.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="glass-card p-8 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
              <s.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">
              {s.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
