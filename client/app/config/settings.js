import Constants from "expo-constants";
import {
  API_URL,

  DEV_API_KEY,
  DEV_AUTH_DOMAIN,
  DEV_STORAGE_BUCKET,
  DEV_PROJECT_ID,
  DEV_MESSAGING_SENDER_ID,
  DEV_APP_ID,
  
  PROD_API_KEY,
  PROD_AUTH_DOMAIN,
  PROD_STORAGE_BUCKET,
  PROD_PROJECT_ID,
  PROD_MESSAGING_SENDER_ID,
  PROD_APP_ID,
  PROD_MEASUREMENT_ID,
} from "@env";

const settings = {
  dev: {
    apiUrl: "http://127.0.0.1:8000",
    apiKey: DEV_API_KEY,
    authDomain: DEV_AUTH_DOMAIN,
    projectId: DEV_PROJECT_ID,
    storageBucket: DEV_STORAGE_BUCKET,
    messagingSenderId: DEV_MESSAGING_SENDER_ID,
    appId: DEV_APP_ID,
    measurementId: null
  },
  prod: {
    apiUrl: API_URL,
    apiKey: PROD_API_KEY,
    authDomain: PROD_AUTH_DOMAIN,
    projectId: PROD_PROJECT_ID,
    storageBucket: PROD_STORAGE_BUCKET,
    messagingSenderId: PROD_MESSAGING_SENDER_ID,
    appId: PROD_APP_ID,
    measurementId: PROD_MEASUREMENT_ID
  }
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;

//   ?: Uncomment this if you want to have a seperate config for staging
//   if (Constants.manifest.releaseChannel == "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
