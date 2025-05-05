
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.44a1fd4fc15c4b8289fa5531a268f154',
  appName: 'neglect-app',
  webDir: 'dist',
  server: {
    url: 'https://44a1fd4f-c15c-4b82-89fa-5531a268f154.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ea384c"
    }
  },
  android: {
    signingConfig: {
      keyAlias: 'android',
      keystorePath: 'android.keystore',
      keystorePassword: 'android',
      keyPassword: 'android',
      certificateFingerprint: '23:A1:C2:F3:1B:FE:CB:03:73:F8:01:A4:21:6A:AF:35:03:53:35:07'
    }
  }
};

export default config;
