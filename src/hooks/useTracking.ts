import { useEffect, useState } from 'react';
import { captureUTMParams, getUTMParams, getReferrer, UTMParams } from '@/lib/utmTracking';
import { initializeTracking } from '@/lib/conversionTracking';

/**
 * Custom hook for tracking functionality
 * Captures UTM params on mount and provides tracking utilities
 */
export const useTracking = () => {
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  useEffect(() => {
    // Initialize tracking scripts
    initializeTracking();

    // Capture UTM params from URL on mount
    const captured = captureUTMParams();
    
    // Get stored or captured params
    const params = Object.keys(captured).length > 0 ? captured : getUTMParams();
    setUtmParams(params);
  }, []);

  return {
    utmParams,
    referrer: getReferrer(),
  };
};
