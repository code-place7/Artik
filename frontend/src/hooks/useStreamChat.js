import { useState, useEffect, Component } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

//this hook is used to connect the current user to the Stream Chat API
//so that users can see each other's messages , send messages to each other , get real time updates etc
// it also handles the disconnection when the user leaves the page
export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);

  // Fetch the Stream token using React Query and renaming the data to streamToken
  const {
    data: streamTokendata,
    isLoading: tokenLoading,
    error: tokenError,
  } = useQuery({
    queryKey: ["streamToken", user?.id], // an identifier for the query

    // we only want to run it if user is authenticated
    queryFn: () => getStreamToken(user.id),
    enabled: !!user?.id, // this will take the object and convert it into boolean value
  });

  //init stream chat client
  useEffect(() => {
    if (!streamTokendata?.token || !user?.id || !STREAM_API_KEY) return;

    const client = StreamChat.getInstance(STREAM_API_KEY); // basically we are defining client with our stream Api kEY so user can start chatting
    let cancelled = false;

    const connect = async () => {
      try {
        //now we are connecting the client with user info
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
          streamTokendata.token
        );
        if (!cancelled) {
          setChatClient(client); //finally we are setting the client
        }
      } catch (error) {
        console.log("Error connecting to stream", error);
        Sentry.captureException(error, {
          tags: { Component: "useStreamChat" },
          extra: {
            context: "stream_chat_connection",
            userId: user?.id,
            streamApiKey: STREAM_API_KEY ? "present" : "missing",
          },
        });
      }
    };
    connect();

    // cleanup function to disconnect the user when the component unmounts or user disconnect from the chat
    return () => {
      cancelled = true;
      client.disconnectUser();
    };
  }, [streamTokendata?.token, user?.id]); // we are adding streamTokendata?.token and user?.id as dependencies because if any of them changes we want to re run the effect

  return { chatClient, tokenLoading, tokenError };
};
