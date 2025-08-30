import { axiosInstance } from "./axios";

export async function getStreamToken() {
  // Fetch the stream token from the backend
  // This endpoint should return a token that can be used for streaming
  //since it is get request so with axiosInstance we have to use get method and we have already set the baseURL in axiosInstance
  // and the endpoint is /chat/token
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
