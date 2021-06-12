import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
// eslint-disable-next-line import/no-cycle
import authApi from '../api/auth';

const key = 'authToken';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log('Error storing auth token', error);
  }
};

const getToken = async () => {
  try {
    await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error getting auth token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  const result = await authApi.checkUserStatus();
  if (result.ok) return jwt_decode(token);
  return null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing auth token', error);
  }
};

export default {
  getToken, getUser, storeToken, removeToken,
};
