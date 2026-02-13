import { ShieldCheck, Clock, Users, Award } from "lucide-react";

const stats = [
  { icon: ShieldCheck, value: "98%", label: "Claim Settlement Ratio" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Users, value: "50K+", label: "Happy Clients" },
  { icon: Award, value: "4.8★", label: "Customer Rating" },
];

const TrustIndicators = () => (
  <section className="relative -mt-16 z-10 container-max px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`glass-card p-6 text-center animate-fade-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <s.icon className="w-8 h-8 text-accent mx-auto mb-3" />
          <p className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            {s.value}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustIndicators;
