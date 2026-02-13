import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Happy family with vehicle and business"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />
      </div>

      <div className="relative container-max px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="animate-fade-up text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            Trusted Insurance Partner
          </p>
          <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Tailored Insurance Solutions for{" "}
            <span className="text-gradient">Vehicles & Businesses</span>
          </h1>
          <p className="animate-fade-up-delay-2 text-primary-foreground/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Affordable premium plans, quick claims, and personalised service.
            Protecting what matters most to you.
          </p>
          <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("#contact")} className="btn-accent text-base">
              Get Your Quote
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-3 rounded-lg font-semibold text-sm tracking-wide text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
