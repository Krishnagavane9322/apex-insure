const steps = [
  { num: "01", title: "Select Your Plan", desc: "Browse our range of insurance plans tailored for your needs." },
  { num: "02", title: "Submit Details", desc: "Fill in your information and vehicle or business details." },
  { num: "03", title: "Get Quote Approval", desc: "Receive a competitive quote within minutes." },
  { num: "04", title: "Get Insured", desc: "Complete payment and get your policy documents instantly." },
  { num: "05", title: "Claim Assistance", desc: "24/7 claim support whenever you need it." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding">
    <div className="container-max">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          How It Works
        </p>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
          Get Covered in 5 Simple Steps
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center lg:text-center">
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                <span className="text-primary-foreground font-bold text-lg">{s.num}</span>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
