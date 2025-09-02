import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const client = StreamChat.getInstance(STREAM_API_KEY); // singleton

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);
  const queryClient = useQueryClient();

  // initial token fetch with React Query
  const {
    data: tokenData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["streamToken", user?.id],
    queryFn: getStreamToken,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 55, // token valid ~1h
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false, // no spam calls on tab switch
  });

  useEffect(() => {
    if (!user?.id || !STREAM_API_KEY) return;
    if (!tokenData?.token && !tokenData?.streamToken) return;

    const connect = async () => {
      try {
        // already connected as this user
        if (client.userID === user.id) {
          console.log("♻️ Already connected as", user.id);
          setChatClient(client);
          return;
        }

        console.log("🔑 Connecting to Stream with token provider...");

        await client.connectUser(
          {
            id: user.id,
            name:
              user.fullName ??
              user.username ??
              user.primaryEmailAddress?.emailAddress ??
              user.id,
            image: user.imageUrl ?? undefined,
          },
          async () => {
            console.log("🔄 Stream requested a new token...");
            // use Query Client to avoid duplicate calls
            const fresh = await queryClient.fetchQuery({
              queryKey: ["streamToken", user.id],
              queryFn: getStreamToken,
            });
            console.log("📥 Provided fresh Stream token", fresh);
            return fresh.token || fresh.streamToken;
          }
        );

        setChatClient(client);
        console.log("✅ Connected to Stream as", user.id);
      } catch (err) {
        console.error("❌ Error connecting to Stream", err);
        Sentry.captureException(err, {
          tags: { component: "useStreamChat" },
          extra: { userId: user?.id },
        });
      }
    };

    connect();
  }, [user?.id, tokenData?.token, tokenData?.streamToken, queryClient]);

  // disconnect only on unmount
  useEffect(() => {
    return () => {
      if (client.userID) {
        client.disconnectUser();
        console.log("👋 Stream chat client disconnected");
      }
    };
  }, []);

  return { chatClient, isLoading, error };
};
