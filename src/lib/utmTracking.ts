/**
 * UTM Tracking Utility
 * Captures and persists UTM parameters from URL
 */

const UTM_STORAGE_KEY = 'reinsure_utm_params';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Capture UTM parameters from current URL
 * Should be called on page load
 */
export const captureUTMParams = (): UTMParams => {
  const params = new URLSearchParams(window.location.search);
  
  const utmParams: UTMParams = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };

  // Only store if at least one UTM parameter exists
  const hasUTM = Object.values(utmParams).some(value => value !== undefined);
  
  if (hasUTM) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  }

  return utmParams;
};

/**
 * Get stored UTM parameters
 * Returns stored params or defaults to organic
 */
export const getUTMParams = (): UTMParams => {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading UTM params:', error);
  }

  // Default to organic if no UTM params found
  return {
    utm_source: 'organic',
  };
};

/**
 * Clear stored UTM parameters
 */
export const clearUTMParams = (): void => {
  localStorage.removeItem(UTM_STORAGE_KEY);
};

/**
 * Get referrer URL
 */
export const getReferrer = (): string => {
  return document.referrer || '';
};
