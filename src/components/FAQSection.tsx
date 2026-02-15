import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/lib/api";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await api.getFAQs();
        if (response.success && response.data) {
          setFaqs(response.data as FAQ[]);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <section id="faqs" className="section-padding">
        <div className="container-max">
          <div className="text-center">Loading FAQs...</div>
        </div>
      </section>
    );
  }

  return (
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
              key={f._id}
              value={`faq-${i}`}
              className="glass-card px-6 border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
};

export default FAQSection;
