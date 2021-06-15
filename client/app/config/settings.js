import Constants from "expo-constants";
import {
  API_URL,
  FIREBASE_PROD_API_KEY,
  FIREBASE_PROD_AUTH_DOMAIN,
  FIREBASE_PROD_PROJECT_ID,
  FIREBASE_PROD_STORAGE_BUCKET,
  FIREBASE_PROD_MESSAGING_SENDER_ID,
  FIREBASE_PROD_APP_ID,
  FIREBASE_PROD_MEASUREMENT_ID,
} from "@env";

const settings = {
  dev: {
    apiUrl: "http://127.0.0.1:8000",
    apiKey: "AIzaSyA4zKo3Ttf8Y_9W3AHZwgv_GrtK1qbI4t0",
    authDomain: "coinpace-dev.firebaseapp.com",
    projectId: "coinpace-dev",
    storageBucket: "coinpace-dev.appspot.com",
    messagingSenderId: "886705582702",
    appId: "1:886705582702:web:73b84f8e7f0c8ff1242c7f",
    measurementId: null,
  },
  staging: {},
  prod: {
    apiUrl: API_URL,
    apiKey: FIREBASE_PROD_API_KEY,
    authDomain: FIREBASE_PROD_AUTH_DOMAIN,
    projectId: FIREBASE_PROD_PROJECT_ID,
    storageBucket: FIREBASE_PROD_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_PROD_MESSAGING_SENDER_ID,
    appId: FIREBASE_PROD_APP_ID,
    measurementId: FIREBASE_PROD_MEASUREMENT_ID,
  },
};

const getCurrentSettings = () => {
  // eslint-disable-next-line no-undef
  if (__DEV__) return settings.dev;

  //   ?: Uncomment this if you want to have a seperate config for staging
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
