import { useState } from "react";
import { Truck, Car, Bus, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useTracking } from "@/hooks/useTracking";
import { trackFormSubmit } from "@/lib/conversionTracking";

interface Service {
  _id: string;
  title: string;
  category: string;
  subTypes: string[];
  emiAvailable: boolean;
}

interface ServiceQuoteFormProps {
  service: Service;
  onSuccess: () => void;
}

const ServiceQuoteForm = ({ service, onSuccess }: ServiceQuoteFormProps) => {
  const { toast } = useToast();
  const { utmParams, referrer } = useTracking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subType: "",
    vehicleType: "",
    coverageType: "comprehensive",
    planDuration: "",
    numberOfMembers: 1,
    emiRequested: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (service.category === 'vehicle' && service.title !== 'Long Term Two Wheeler Insurance' && !formData.vehicleType) {
      toast({ title: "Please select a vehicle type", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit lead with UTM tracking data
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: service.title,
        insuranceType: service.category,
        subType: formData.subType,
        vehicleType: formData.vehicleType,
        coverageType: formData.coverageType,
        planDuration: formData.planDuration,
        numberOfMembers: formData.numberOfMembers,
        emiRequested: formData.emiRequested,
        message: formData.message,
        ...utmParams,
        referrer,
      };

      const response = await api.createLead(leadData);
      
      if (response.success) {
        // Fire conversion tracking events
        trackFormSubmit({
          service: service.title,
          email: formData.email,
        });

        toast({
          title: "Quote Request Submitted!",
          description: "Our team will contact you shortly with the best EMI options.",
        });
        onSuccess();
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Vehicle-specific fields - MOVED TO TOP */}
      {service.category === 'vehicle' && service.title !== 'Long Term Two Wheeler Insurance' && (
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-xl font-display font-bold text-primary mb-6">
              Choose Vehicle Type
            </label>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'goods', label: 'Goods Carrying', icon: Truck },
                { id: 'taxi', label: 'Taxi upto 6 pass.', icon: Car },
                { id: 'bus', label: 'Bus', icon: Bus },
                { id: 'others', label: 'Others', icon: LayoutGrid },
              ].map((type) => {
                const Icon = type.icon;
                const isSelected = formData.vehicleType === type.label;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, vehicleType: type.label, subType: type.label }))}
                    className={`flex flex-col items-center justify-center w-28 h-28 rounded-xl border-2 transition-all p-3 gap-2 ${
                      isSelected 
                        ? 'border-[#E89344] bg-[#E89344] text-white shadow-lg scale-105' 
                        : 'border-[#1E3A8A] bg-white text-[#1E3A8A] hover:border-[#E89344]/60 hover:shadow-md'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-[#1E3A8A]'}`} />
                    <span className="text-xs font-bold leading-tight uppercase tracking-wide text-center">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Personal Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Email Address <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Service-Specific Fields */}
      {service.subTypes.length > 0 && service.category !== 'vehicle' && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {service.category === 'health' ? 'Plan Type' : 'Select Type'}
          </label>
          <select
            name="subType"
            value={formData.subType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Choose an option</option>
            {service.subTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Vehicle-specific coverage fields */}
      {service.category === 'vehicle' && service.title !== 'Long Term Two Wheeler Insurance' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Coverage Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="coverageType"
                  value="comprehensive"
                  checked={formData.coverageType === 'comprehensive'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground">Comprehensive</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="coverageType"
                  value="third-party"
                  checked={formData.coverageType === 'third-party'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground">Third Party</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Health Insurance specific */}
      {service.category === 'health' && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Number of Members
          </label>
          <input
            type="number"
            name="numberOfMembers"
            value={formData.numberOfMembers}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* EMI Option */}
      {service.emiAvailable && (
        <div className="bg-accent/10 p-4 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="emiRequested"
              checked={formData.emiRequested}
              onChange={handleChange}
              className="w-5 h-5 text-accent rounded"
            />
            <div>
              <span className="text-foreground font-semibold">I want EMI options</span>
              <p className="text-sm text-muted-foreground">Get flexible payment plans with easy installments</p>
            </div>
          </label>
        </div>
      )}

      {/* Additional Message */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Additional Requirements (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Any specific requirements or questions..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-accent w-full py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Get Quote on EMI'}
      </button>
    </form>
  );
};

export default ServiceQuoteForm;
