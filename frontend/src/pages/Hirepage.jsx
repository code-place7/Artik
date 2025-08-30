import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat";
import PageLoader from "../components/PageLoader";

const Hirepage = () => {
  const { isCreateModel, setISCreateModel } = useState(false);
  const { activeChannel, setActiveChannel } = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { chatClient, tokenLoading, error } = useStreamChat();
  // set active channel from URL params
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);
  if (error) return <p>Something went wrong...</p>;
  if (true) return <PageLoader />;

  return <div>Hirepage</div>;
};

export default Hirepage;
