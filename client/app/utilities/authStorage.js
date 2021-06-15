import * as SecureStore from "expo-secure-store";

import Firebase from "../config/firebase";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token", error);
  }
};

const getUser = async () => {
  return new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((token) => {
          storeToken(token);
          resolve(user);
        });
      } else {
        resolve(null);
      }
    });
  });
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing auth token", error);
  }
};

export default {
  getToken,
  getUser,
  storeToken,
  removeToken,
};
