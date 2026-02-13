import { ShieldCheck, Wallet, UserCheck, Eye, HeadphonesIcon } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Strong Claim Settlement", desc: "Industry-leading claim approval and fast processing." },
  { icon: Wallet, title: "Easy EMI Options", desc: "Affordable monthly installments with zero hassle." },
  { icon: UserCheck, title: "Personalised Service", desc: "Dedicated advisors who understand your unique needs." },
  { icon: HeadphonesIcon, title: "Expert Advisors", desc: "Certified professionals guiding you every step." },
  { icon: Eye, title: "Transparent Policies", desc: "No hidden charges, no surprises — ever." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="section-padding section-alt">
    <div className="container-max">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
          Why Clients Trust Our Services
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="glass-card p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <r.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
