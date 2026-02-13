import { CheckCircle2 } from "lucide-react";

const points = [
  "Reliable insurance solutions for individuals and businesses",
  "High claim settlement success rate across all plans",
  "Expert advisors available to assist you 24/7",
  "Transparent policies with no hidden charges",
  "Serving clients across India with dedicated support",
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container-max">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            About Us
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
            Your Trusted Partner in Insurance Since 2009
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Reinsure Services is a leading insurance advisory firm specializing
            in commercial vehicle insurance, business risk coverage, and
            personalised insurance plans. With over 15 years of experience, we
            have helped thousands of clients protect what matters most.
          </p>
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="bg-primary/5 rounded-2xl p-10 lg:p-14">
            <div className="space-y-8">
              <div>
                <p className="text-5xl font-display font-bold text-primary">15+</p>
                <p className="text-muted-foreground mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="text-5xl font-display font-bold text-primary">50K+</p>
                <p className="text-muted-foreground mt-1">Policies Managed</p>
              </div>
              <div>
                <p className="text-5xl font-display font-bold text-primary">98%</p>
                <p className="text-muted-foreground mt-1">Claim Settlement Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
