import { useState } from "react";
import { X } from "lucide-react";
import ServiceQuoteForm from "./ServiceQuoteForm.tsx";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  subTypes: string[];
  features: string[];
  emiAvailable: boolean;
}

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal = ({ service, isOpen, onClose }: ServiceDetailModalProps) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-display font-bold mb-2">{service.title}</h2>
          <p className="text-primary-foreground/90">{service.description}</p>
        </div>

        {/* Features */}
        <div className="p-6 bg-section-gradient">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            Why Choose Us?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-foreground">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-xs">✓</span>
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Form */}
        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Get Your Quote on EMI
          </h3>
          <ServiceQuoteForm service={service} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
