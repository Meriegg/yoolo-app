import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import * as secureStore from "expo-secure-store";

const baseApiUrl = "http://192.168.1.3:5000";
interface Options {
  ignoreRefresh: boolean;
}

const getNewTokens = async (config: AxiosRequestConfig) => {
  try {
    const refreshToken = await secureStore.getItemAsync("refreshToken");
    const reqHeaders = {
      refreshToken: refreshToken,
    };

    const apiRes = await axios.get(`${baseApiUrl}/auth/refreshToken`, {
      headers: reqHeaders as any,
    });

    await secureStore.setItemAsync("refreshToken", apiRes?.data?.refreshToken);
    await secureStore.setItemAsync("accessToken", apiRes?.data?.accessToken);

    config.headers
      ? (config.headers[
          "Authorization"
        ] = `Bearer ${apiRes?.data?.accessToken}`)
      : null;
  } catch (error) {
    console.error(error);
  }
};

const useAxios = (options: Options) => {
  const instance = axios.create({ baseURL: baseApiUrl });

  instance.interceptors.request.use(async (config) => {
    const accessToken = await secureStore.getItemAsync("accessToken");

    config.headers
      ? (config.headers["Authorization"] = `Bearer ${accessToken}`)
      : null;
    if (options.ignoreRefresh) {
      return config;
    }

    if (!accessToken) {
      await getNewTokens(config);
      return config;
    }

    const decoded: any = jwtDecode(accessToken);
    if (Date.now() >= decoded?.exp * 1000) {
      await getNewTokens(config);
      return config;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => ({
      error: false,
      status: response.status,
      data: response.data,
      errorMessage: undefined,
    }),
    (error) => {
      console.error(error);

      if (!axios.isAxiosError(error)) {
        return {
          error: true,
          data: error?.response?.data || error?.data || undefined,
          errorMessage: error?.message || "Unidentifiable error!",
          status: error?.status || 0,
        };
      }

      return {
        error: true,
        data: error?.response?.data,
        errorMessage: error?.message,
        status: error?.response?.status,
      };
    }
  );

  return instance;
};

export default useAxios;
