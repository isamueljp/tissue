
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.50d4eb7e786a4aa0a5f532be6671530f',
  appName: 'society6',
  webDir: 'dist',
  server: {
    url: 'https://50d4eb7e-786a-4aa0-a5f5-32be6671530f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#000000",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#dc2626",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
