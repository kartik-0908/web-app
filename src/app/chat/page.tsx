import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChatCard from "@/components/Chat/ChatCard";
import ChatCard2 from "@/components/Chat/ChatCard2";



interface Conversation {
  name: string;
  avatar: string;
  message: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    name: 'Henry Dholi',
    avatar: 'avatar1.jpg',
    message: 'I cam across your profile and...',
    time: '1:55pm'
  },
  {
    name: 'Mariya Desoja',
    avatar: 'avatar2.jpg',
    message: 'I like your confidence 👍',
    time: '1:55pm'
  },
  // ... other conversations
];



const Chat = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Chat History" />

        <div className="grid grid-cols-5">
          <div className="col-span-5 xl:col-span-2">
            {/* <ChatCard/> */}
          </div>
          <div className="col-span-5 xl:col-span-3">
           <ChatCard2/>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Chat;
