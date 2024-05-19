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

interface ParsedMessage {
  reply: string;
  products: { name: string; price: string; imageUrl: string }[];
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return "Sent at " + strTime;
};

const ConversationDetails: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
  const splitMessage = (text: string) => {
    const words = text.split(' ');
    let chunks: string[] = [];
    let currentChunk: string[] = [];

    words.forEach(word => {
      currentChunk.push(word);
      const chunkText = currentChunk.join(' ');

      if (chunkText.split(' ').length > 30 && (word.endsWith('.') || word.endsWith(':'))) {
        chunks.push(chunkText);
        currentChunk = [];
      }
    });

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return chunks;
  };

  const createCardElement = (messageText: string, isUser: boolean) => {
    messageText = messageText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    return (
      <div
        className={`rounded-lg px-4 py-2 max-w-100 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray text-black'
        }`}
        dangerouslySetInnerHTML={{ __html: messageText }}
      />
    );
  };

  const renderProducts = (products: { name: string; price: string; imageUrl: string }[]) => {
    return (
      <div className="product-carousel mt-4">
        {products.map((product, index) => (
          <div key={index} className="product-card border p-2 rounded-lg">
            <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
            <h3 className="font-semibold">{product.name}</h3>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 dark:border-strokedark dark:bg-boxdark xl:col-span-8 h-[600px] overflow-y-auto">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Conversation Details
      </h4>
      <div className="px-7.5">
        {conversation.Message.map((message) => {
          let parsedMessage: ParsedMessage | null = null;

          if (message.senderType !== 'user') {
            try {
              parsedMessage = JSON.parse(message.text);
            } catch (error) {
              console.error('Failed to parse message JSON:', error);
            }
          }

          return (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.senderType === 'user' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div>
                {message.senderType === 'user' ? (
                  <>
                    {createCardElement(message.text, true)}
                    <p className="text-xs text-gray-500 pt-1">{formatTime(message.timestamp)}</p>
                  </>
                ) : (
                  <>
                    {parsedMessage && (
                      <>
                        {splitMessage(parsedMessage.reply).map((chunk, index) => (
                          <div key={index}>
                            {createCardElement(chunk, false)}
                          </div>
                        ))}
                        {parsedMessage.products.length > 0 && renderProducts(parsedMessage.products)}
                      </>
                    )}
                    <p className="text-xs text-gray-500 text-right pt-1">{formatTime(message.timestamp)}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationDetails;
