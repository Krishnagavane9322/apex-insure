import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.createQuote(form);
      if (response.success) {
        toast({
          title: "Quote request submitted!",
          description: "Our team will contact you shortly.",
        });
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to submit request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding section-alt">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Request a Free Quote
          </h2>
          <p className="text-muted-foreground text-lg">
            Fill out the form below and our team will get back to you within 24
            hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-muted-foreground text-sm">
                    +91 98222 10941
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Email Us</p>
                  <p className="text-muted-foreground text-sm">
                    rensureinsurance@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Visit Us</p>
                  <p className="text-muted-foreground text-sm">
                    Office No. 203, 2204, Velstand, Mundhawa Kharadi Road, Tukaram Nagar, Opposite Reliance Mart, Kharadi, Haaveli, Pune - 411014
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your@email.com"
                  maxLength={255}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+91 XXXXX XXXXX"
                  maxLength={15}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Service
                </label>
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a service</option>
                  <option value="commercial-vehicle">
                    Commercial Vehicle Insurance
                  </option>
                  <option value="comprehensive">Comprehensive Coverage</option>
                  <option value="third-party">Third Party Insurance</option>
                  <option value="business">Business Insurance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your requirements..."
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              className="btn-accent w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
