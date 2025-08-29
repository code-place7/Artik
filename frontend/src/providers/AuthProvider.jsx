import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  // every single time before the application run a request, this interceptor will be called and it will include your token in the request headers
  useEffect(() => {
    // setup axios interceptor

    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          //if there is a token meaning we are authenticated and we are adding token to the headers and just by doing this backend will be able to verify the token and authorize  the user to access the protected routes
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication issue. Please refresh the page.");
          }
          console.log("Error getting token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Axios request error:", error);
        return Promise.reject(error);
      }
    );

    // cleanup function to remove the interceptor, this is important to avoid memory leaks
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
