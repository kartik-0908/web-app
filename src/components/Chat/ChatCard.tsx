import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";

interface Message {
  conversationId: string;
  id: string;
  senderId: number;
  senderType: "user" | "bot";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  shopDomain: string;
  startedAt: Date;
  customerEmail?: string
  Message: Message[];
}

interface ChatCardProps {
  lastThreeConversations: Conversation[];
}

const ChatCard: React.FC<ChatCardProps> = ({ lastThreeConversations = [] }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Recent conversations
      </h4>
      <div>
        {lastThreeConversations.map((conversation, index) => {
          const userMessage = conversation.Message.find((m) => m.senderType === 'user');
          const botMessage = conversation.Message.find((m) => m.senderType === 'bot');
          const customerEmail = conversation.customerEmail || "Anonymour user"

          return (
            <Link href="/chat" className="flex items-center gap-5 px-7.5 py-3 " key={index}>
              <div className="relative h-14 w-14 rounded-full">
                <Image src='/images/user/user-01.png' alt="User" layout="fill" />
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {customerEmail}
                  </h5>
                  <p className="text-sm text-black dark:text-white">
                    <div>
                      {` User: ${userMessage?.text}`}

                    </div>
                    {botMessage ? ` Bot: ${botMessage.text}` : ''}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatCard;
