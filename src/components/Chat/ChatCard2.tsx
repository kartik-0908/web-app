"use client"
// import { Chat } from "@/types/chat";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Message {
  id: string;
  conversationId: string;
  timestamp: string;
  senderId: number;
  text: string;
  senderType: string;
  unanswered: boolean;
}

interface Conversation {
  id: string;
  shopDomain: string;
  startedAt: string;
  Message: Message[];
}

type ChatData = Conversation[];

interface ChatCard2Props {
  onConversationClick: (conversation: Conversation) => void; // Add this line
}

const ChatCard2:React.FC<ChatCard2Props> = ({onConversationClick}) => {
  const [chatData, setChatData] = React.useState<ChatData>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  const fetchMoreData = async () => {
    try {
      const response = await axios.get(`/api/v1/data/chat?page=${page}&limit=${limit}`);
      const data = response.data;

      if (data.data && data.data.length > 0) {
        setChatData((prevData) => [...prevData, ...data.data]);
        // console.log(data.data)
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  React.useEffect(() => {
    // Fetch initial data
    fetchMoreData();
  }, []);

  return (
    <div className="h-[600px] overflow-y-auto col-span-12 rounded-sm border border-stroke bg-white py-6 dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Conversations
      </h4>
      <div>
        <div>
          <InfiniteScroll
            dataLength={chatData.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {chatData.map((conversation) => {
            const messages = conversation.Message;
            const firstMessage = messages[0];
            const secondMessage = messages[1];

            return (
              <Link
                href="#"
                className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
                onClick={(e) => {
                  e.preventDefault(); // Prevent link navigation
                  onConversationClick(conversation); // Use the passed callback
                }}
                key={conversation.id}
              >
                <div className="relative h-14 w-14 rounded-full">
                  <Image
                    src="/images/user/user-01.png"
                    alt="User"
                    layout="fill"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {conversation.id}
                    </h5>
                    <p className="text-sm text-black dark:text-white">
                      {firstMessage && (
                        <div>
                          {firstMessage.senderType}: {firstMessage.text}
                        </div>
                      )}
                      {secondMessage && (
                        <div>
                          {secondMessage.senderType}: {secondMessage.text}
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default ChatCard2;
