import { create } from "apisauce";
import authStorage from "../auth/storage";
import Constants from "expo-constants";
const { manifest } = Constants;

const apiClient = create({
  baseURL: `http://${manifest.debuggerHost.split(':').shift()}:8000`,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const token = await authStorage.getToken();
  if (!token) return;
  request.headers["Authorization"] = 'Bearer '.concat(token);
});

export default apiClient;
