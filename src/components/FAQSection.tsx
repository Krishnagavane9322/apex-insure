import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of insurance do you offer?",
    a: "We specialize in commercial vehicle insurance including third party, comprehensive, and owner-driver personal accident covers. We also offer custom business insurance plans.",
  },
  {
    q: "How fast is the claim settlement process?",
    a: "Most claims are processed within 7-10 working days. Our dedicated claim support team assists you via phone and WhatsApp throughout the entire process.",
  },
  {
    q: "Can I pay my premium in installments?",
    a: "Yes! We offer flexible EMI and part-payment options so you can get covered without any financial burden.",
  },
  {
    q: "Do you provide roadside assistance?",
    a: "Absolutely. Our comprehensive plans include 24/7 roadside assistance and doorstep vehicle support across India.",
  },
  {
    q: "How do I get a quote?",
    a: "Simply fill out our contact form or call us directly. You'll receive a competitive quote within minutes from our expert advisors.",
  },
];

const FAQSection = () => (
  <section id="faqs" className="section-padding">
    <div className="container-max">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          FAQs
        </p>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card px-6 border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
