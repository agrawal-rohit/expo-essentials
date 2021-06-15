import { create } from "apisauce";
import authStorage from "../utilities/authStorage";
import cache from "../utilities/cache";
import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.apiUrl,
});

// Add caching to the GET API calls
const { get } = apiClient;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  // Cache a successful response
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  // Return a previously cached response
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

apiClient.addAsyncRequestTransform(async (request) => {
  const token = await authStorage.getToken();
  if (!token) return;
  request.headers.Authorization = "Bearer ".concat(token);
});

export default apiClient;
