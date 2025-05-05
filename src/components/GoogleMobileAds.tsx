
import React, { useEffect, useRef } from 'react';

// Add type declaration for the window.adsbygoogle property
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleMobileAdsProps {
  adUnitId?: string;
}

const GoogleMobileAds: React.FC<GoogleMobileAdsProps> = ({ 
  adUnitId = 'ca-app-pub-4533363193509892~7228905677' // Your actual app ID
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // Initialize Google Mobile Ads
    const initializeGoogleAds = () => {
      if (typeof window !== 'undefined' && !adInitialized.current) {
        // Load the Google Mobile Ads SDK script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4533363193509892';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          try {
            console.log("Google Ads SDK loaded");
            
            // Initialize the SDK
            if (window.adsbygoogle) {
              window.adsbygoogle.push({
                google_ad_client: 'ca-pub-4533363193509892', // Your actual ad client ID
                enable_page_level_ads: true
              });
              
              // Display the banner ad
              displayBannerAd();
              adInitialized.current = true;
            }
          } catch (error) {
            console.error('Error initializing Google Mobile Ads:', error);
          }
        };
        
        // Add the script to the document
        document.head.appendChild(script);
      } else if (adInitialized.current) {
        // If already initialized, just display the ad
        displayBannerAd();
      }
    };

    const displayBannerAd = () => {
      if (adContainerRef.current && window.adsbygoogle) {
        try {
          // Push the ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log('Banner ad pushed');
        } catch (error) {
          console.error('Error displaying banner ad:', error);
        }
      }
    };

    initializeGoogleAds();

    // Cleanup function
    return () => {
      // No cleanup needed for banner ads
    };
  }, [adUnitId]);

  return (
    <div className="google-ads-container">
      <div ref={adContainerRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-4533363193509892" // Your actual ad client ID
          data-ad-slot={adUnitId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <div className="text-xs text-center text-gray-400 mt-1">מודעה</div>
    </div>
  );
};

export default GoogleMobileAds;
