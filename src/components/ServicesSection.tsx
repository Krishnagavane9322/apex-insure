import { useEffect, useState } from "react";
import { Car, CreditCard, HeadphonesIcon, Home, Shield, Wrench, Truck, Bike, Calendar, Heart } from "lucide-react";
import { api } from "@/lib/api";
import ServiceDetailModal from "./ServiceDetailModal";

const iconMap: Record<string, any> = {
  Car,
  CreditCard,
  HeadphonesIcon,
  Home,
  Shield,
  Wrench,
  Truck,
  Bike,
  Calendar,
  Heart,
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  category: string;
  subTypes: string[];
  features: string[];
  emiAvailable: boolean;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        if (response.success && response.data) {
          setServices(response.data as Service[]);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return (
      <section id="services" className="section-padding section-alt">
        <div className="container-max">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="services" className="section-padding section-alt">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Comprehensive Insurance Plans Built For You
            </h2>
            <p className="text-muted-foreground text-lg">
              From commercial vehicles to health coverage — we have a plan for every need with easy EMI options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => {
              const IconComponent = iconMap[s.icon] || Shield;
              return (
                <div
                  key={s._id}
                  onClick={() => handleServiceClick(s)}
                  className="glass-card p-8 group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                  <button className="text-accent font-semibold text-sm hover:underline">
                    Get Quote on EMI →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ServicesSection;
