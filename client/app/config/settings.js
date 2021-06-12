// import Constants from 'expo-constants';
import 'dotenv/config';

const settings = {
  dev: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.DEV_API_KEY,
    authDomain: process.env.DEV_AUTH_DOMAIN,
    projectId: process.env.DEV_PROJECT_ID,
    storageBucket: process.env.DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.DEV_MESSAGING_SENDER_ID,
    appId: process.env.DEV_APP_ID,
    measurementId: null,
  },
  prod: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.PROD_API_KEY,
    authDomain: process.env.PROD_AUTH_DOMAIN,
    projectId: process.env.PROD_PROJECT_ID,
    storageBucket: process.env.PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.PROD_MESSAGING_SENDER_ID,
    appId: process.env.PROD_APP_ID,
    measurementId: process.env.PROD_MEASUREMENT_ID,
  },
};

const getCurrentSettings = () => {
  // eslint-disable-next-line no-undef
  if (__DEV__) return settings.dev;

  //   ?: Uncomment this if you want to have a seperate config for staging
  //   if (Constants.manifest.releaseChannel == "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
