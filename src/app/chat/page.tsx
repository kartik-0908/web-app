"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChatCard2 from "@/components/Chat/ChatCard2";
import { useState } from "react";
import ConversationDetails from "@/components/Chat/ConversationCard";
import ConversationDetailsEmpty from "@/components/Chat/ConversationCardempty";
import AuthWrapper from "../AuthWrapper";


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

  const handleConversationClick = (conversations: Conversation[]) => {
    setSelectedConversations(conversations);
  };

  return (
    <AuthWrapper>
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Chat History" />

          <div className="grid grid-cols-5">
            <div className="col-span-5 xl:col-span-2">
              <ChatCard2 onConversationClick={handleConversationClick} setHasConversations={setHasConversations} />
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
    </AuthWrapper>
  );
};

export default Chat;
