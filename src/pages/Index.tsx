import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustIndicators />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
