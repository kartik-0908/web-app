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
  setHasConversations: (hasConversations: boolean) => void;
}

const ChatCard2: React.FC<ChatCard2Props> = ({ onConversationClick, setHasConversations }) => {
  const [chatData, setChatData] = React.useState<ChatData>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };


  const fetchMoreData = async () => {
    try {
      const response = await axios.get(`/api/v1/data/chat?page=${page}&limit=${limit}`);
      const data = response.data;

      if (data.data && data.data.length > 0) {
        setChatData((prevData) => [...prevData, ...data.data]);
        setHasConversations(true);
        // console.log(data.data)
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
        if (chatData.length === 0) {
          setHasConversations(false); // Add this line
        }
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
              let firstMessageText;
              let secondMessageText;
              // console.log(firstMessage)
              if (firstMessage.senderType === "user") {
                firstMessageText = truncateText(messages[0].text, 10); // Show first 10 words
              }
              else {
                firstMessageText = truncateText(JSON.parse(messages[0].text).reply, 10); // Show first 10 words
              }
              const secondMessage = messages[1];
              console.log(messages[1])

              if (secondMessage && secondMessage.senderType === "user") {
                secondMessageText = truncateText(messages[1].text, 10); // Show first 10 words
              }
              else if (secondMessage) {
                secondMessageText = truncateText(JSON.parse(messages[1].text).reply, 10); // Show first 10 words
              }




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
                        {/* {conversation.id} */}
                        Anonymous user
                      </h5>
                      <p className="text-sm text-black dark:text-white">
                        {firstMessage && (
                          <div>
                            {firstMessage.senderType}: {firstMessageText}
                          </div>
                        )}
                        {secondMessage && (
                          <div>
                            {secondMessage.senderType}: {secondMessageText}
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
