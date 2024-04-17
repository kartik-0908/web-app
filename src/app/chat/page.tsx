"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChatCard2 from "@/components/Chat/ChatCard2";
import { useState } from "react";
import ConversationDetails from "@/components/Chat/ConversationCard";
import ConversationDetailsEmpty from "@/components/Chat/ConversationCardempty";
import AuthWrapper from "../AuthWrapper.tsx";


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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const handleConversationClick = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  return (
    <AuthWrapper>
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Chat History" />

          <div className="grid grid-cols-5">
            <div className="col-span-5 xl:col-span-2">
              <ChatCard2 onConversationClick={handleConversationClick} />
            </div>
            <div className="col-span-5 xl:col-span-3">
              {selectedConversation ? (
                <ConversationDetails conversation={selectedConversation} />
              ) : (
                <ConversationDetailsEmpty />
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </AuthWrapper>
  );
};

export default Chat;
