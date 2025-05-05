
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
  }
};

export default config;
