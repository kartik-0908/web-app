// ConversationDetails.tsx
import React from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  timestamp: string;
  senderId: number;
  text: string;
  senderType: string;
}

interface Conversation {
  id: string;
  Message: Message[];
}

const ConversationDetails: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 dark:border-strokedark dark:bg-boxdark xl:col-span-8 h-[600px] overflow-y-auto ">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Conversation Details
      </h4>
      <div className="px-7.5">
        {conversation.Message.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.senderType === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.senderType === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationDetails;