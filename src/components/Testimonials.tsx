import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Fleet Owner, Delhi",
    text: "Fast claim processing and personal attention. Reinsure made my commercial vehicle insurance hassle-free. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    role: "Business Owner, Mumbai",
    text: "The EMI facility and transparent pricing won me over. I've been with Reinsure for 3 years and counting.",
  },
  {
    name: "Anil Mehta",
    role: "Transport Company, Jaipur",
    text: "Their 24/7 claim support saved me during an emergency. Professional, quick, and genuinely caring.",
  },
  {
    name: "Sunita Verma",
    role: "Individual Policyholder, Bangalore",
    text: "I never thought insurance could be this simple. The team at Reinsure explained everything clearly and I got covered the same day.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  const r = reviews[current];

  return (
    <section id="testimonials" className="section-padding section-alt">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 lg:p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-8 italic">
              "{r.text}"
            </p>
            <p className="font-display font-bold text-foreground">{r.name}</p>
            <p className="text-sm text-muted-foreground">{r.role}</p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
