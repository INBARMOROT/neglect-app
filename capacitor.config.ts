
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
      certificateFingerprint: 'F8:34:B9:19:FA:7E:F7:B1:28:7A:58:30:42:58:3E:D2:12:4C:4E:5A'
    }
  }
};

export default config;
