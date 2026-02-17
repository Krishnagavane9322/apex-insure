/**
 * Conversion Tracking Utility
 * Integrates with Google Tag Manager and Meta Pixel
 */

// Extend Window interface for GTM and Meta Pixel
declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

/**
 * Track form submission conversion
 * Fires both GTM and Meta Pixel events
 */
export const trackFormSubmit = (leadData?: {
  service?: string;
  email?: string;
}) => {
  // Google Tag Manager event
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submit',
      lead_service: leadData?.service || 'unknown',
      lead_email: leadData?.email || '',
    });
    console.log('GTM: form_submit event fired');
  }

  // Meta Pixel event
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: leadData?.service || 'General Inquiry',
      content_category: 'Insurance',
    });
    console.log('Meta Pixel: Lead event fired');
  }
};

/**
 * Track phone click conversion
 */
export const trackPhoneClick = (phoneNumber: string) => {
  // Google Tag Manager event
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'phone_click',
      phone_number: phoneNumber,
    });
    console.log('GTM: phone_click event fired');
  }

  // Meta Pixel event
  if (window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Phone Click',
    });
    console.log('Meta Pixel: Contact event fired');
  }
};

/**
 * Track WhatsApp click conversion
 */
export const trackWhatsAppClick = () => {
  // Google Tag Manager event
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'whatsapp_click',
    });
    console.log('GTM: whatsapp_click event fired');
  }

  // Meta Pixel event
  if (window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Click',
    });
    console.log('Meta Pixel: Contact event fired');
  }
};

/**
 * Track get quote button click
 */
export const trackGetQuoteClick = (service?: string) => {
  // Google Tag Manager event
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'get_quote_click',
      service: service || 'unknown',
    });
    console.log('GTM: get_quote_click event fired');
  }

  // Meta Pixel event
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: service || 'Insurance Quote',
    });
    console.log('Meta Pixel: InitiateCheckout event fired');
  }
};

/**
 * Initialize tracking scripts
 * Call this once on app initialization
 */
export const initializeTracking = () => {
  // Initialize GTM dataLayer if not exists
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  console.log('Tracking initialized');
};
