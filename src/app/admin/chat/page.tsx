"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChatCard2 from "@/components/Chat/ChatCard2";
import { useEffect, useState } from "react";
import ConversationDetails from "@/components/Chat/ConversationCard";
import ConversationDetailsEmpty from "@/components/Chat/ConversationCardempty";

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

const Chat = () => {
  const [selectedConversations, setSelectedConversations] = useState<Conversation[]>([]);
  const [hasConversations, setHasConversations] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter');
      if (filterParam) {
        setFilter(filterParam);
      }
    }
  }, []);

  const handleConversationClick = (conversations: Conversation[]) => {
    setSelectedConversations(conversations);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Chat History" />

          <div className="grid grid-cols-5">
            <div className="col-span-5 xl:col-span-2">
              <ChatCard2 
                onConversationClick={handleConversationClick} 
                setHasConversations={setHasConversations} 
                filter={filter} // Pass the filter state
                onFilterChange={handleFilterChange} // Handle filter changes
              />
            </div>
            <div className="col-span-5 xl:col-span-3">
              {selectedConversations.length > 0 ? (
                <ConversationDetails conversations={selectedConversations} />
              ) : (
                <ConversationDetailsEmpty hasConversations={hasConversations} />
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default Chat;
