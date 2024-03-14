import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "../api";
import { REFRESH_LINK, SIGN_IN_LINK, SIGN_UP_LINK } from "@/constants/links";
import { IItem } from "@/types";

interface AuthParams {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: () => void;
}
interface AuthenticatedRequestParams {
  url: string;
  body?: IItem;
  method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
}

type AuthStore = {
  isAuthenticated: boolean;
  access_token: string;
  refresh_token: string;
  signUp: (params: AuthParams) => Promise<void>;
  signIn: (params: AuthParams) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  handleAuthenticatedRequest: ({
    url,
    body,
    method,
  }: AuthenticatedRequestParams) => Promise<void>;
};

const authApiCall = async (
  endpoint: string,
  params: AuthParams,
  set: (state: Partial<AuthStore>) => void,
) => {
  const { email, password, onSuccess, onError } = params;
  try {
    const res = await axios.post(endpoint, { email, password });
    console.log(res, "resff");
    onSuccess();
    set({
      isAuthenticated: true,
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
    });
  } catch (error) {
    onError();
  }
};

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      isAuthenticated: false,
      access_token: "",
      refresh_token: "",
      signUp: (params) => authApiCall(SIGN_UP_LINK, params, set),
      signIn: (params) => authApiCall(SIGN_IN_LINK, params, set),
      logout: () => {
        set({ isAuthenticated: false, access_token: "", refresh_token: "" });
      },
      handleAuthenticatedRequest: async ({
        url,
        body,
        method,
      }: AuthenticatedRequestParams) => {
        const config = {
          url,
          method,
          headers: {
            Authorization: `Bearer ${get().access_token}`,
          },
          ...(method === "GET" || method === "DELETE" ? {} : { data: body }),
        };

        try {
          const response = await axios(config);
          return response.data;
        } catch (error) {
          console.error("Error during authenticated request:", error);
          throw error;
        }
      },
      refresh: async () => {
        try {
          const res = await axios.post(REFRESH_LINK, null, {
            headers: {
              Authorization: `Bearer ${get().refresh_token}`,
            },
          });
          set({
            isAuthenticated: true,
            access_token: res.data.accessToken,
            refresh_token: res.data.refreshToken,
          });
        } catch (error) {
          console.error("Refresh token error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
