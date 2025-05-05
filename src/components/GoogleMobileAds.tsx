
import React, { useEffect } from 'react';

interface GoogleMobileAdsProps {
  adUnitId?: string;
}

const GoogleMobileAds: React.FC<GoogleMobileAdsProps> = ({ adUnitId = 'ca-app-pub-3940256099942544/6300978111' }) => {
  useEffect(() => {
    // Initialize Google Mobile Ads
    const initializeGoogleAds = () => {
      if (typeof window !== 'undefined') {
        // Create script element
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.onload = () => {
          try {
            // @ts-ignore - Google Ads is added to the window object
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('Google Mobile Ads initialized successfully');
          } catch (error) {
            console.error('Error initializing Google Mobile Ads:', error);
          }
        };
        // Add the script to the document
        document.head.appendChild(script);
      }
    };

    initializeGoogleAds();

    // Cleanup function
    return () => {
      // Remove any ad-related elements or listeners if needed
    };
  }, []);

  return (
    <div className="google-ads-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual ad client ID
        data-ad-slot={adUnitId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="text-xs text-center text-gray-400 mt-1">מודעה</div>
    </div>
  );
};

export default GoogleMobileAds;
