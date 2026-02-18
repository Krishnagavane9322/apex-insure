import { X } from "lucide-react";
import ServiceQuoteForm from "./ServiceQuoteForm.tsx";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultService = {
  _id: "header-quote",
  title: "Commercial Vehicle Insurance",
  category: "vehicle",
  subTypes: ["Goods Carrying", "Taxi (up to 6 passengers)", "Bus", "Others"],
  emiAvailable: true,
};

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-primary text-primary-foreground p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-bold">Get Your Quote</h2>
            <p className="text-primary-foreground/80 text-sm">Fill in the details below to get started</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <ServiceQuoteForm service={defaultService} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
