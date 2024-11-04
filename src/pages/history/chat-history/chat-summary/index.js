import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MinChatUiProvider, MainContainer, MessageInput, MessageContainer, MessageList, MessageHeader } from "@minchat/react-chat-ui"
import { database, onValue, ref } from "../../../../config/firebase-config";
import { ArrowBack } from "@mui/icons-material";

const ChatSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const chat_id = `customer_${location?.state.customerID}_astro_${location?.state.astroID}`;

  //! Initiate Chat
  useEffect(() => {
    const messagesRef = ref(database, `ChatMessages/${chat_id}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];

      for (let key in data) {
        const message = data[key];
        const media = message.image && { type: 'image', url: message.image, size: '', name: '' };
        console.log("Single Message ::: ", message)
        console.log("Single Message User ID ::: ", message?.user?._id)

        loadedMessages.push({ ...message, media, createdAt: new Date(message?.createdAt), user: { id: message?.user?._id, name: message?.user?.name } });
      }
      setMessages(loadedMessages);
    });
  }, []);

  return (
    <>
      <div onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: 'pointer' }}><ArrowBack /></div>
      <div className='p-5 pl-10'>
        <MinChatUiProvider theme="#6EA9D7">
          <MainContainer style={{ height: '80vh', width: "100%" }}>
            <MessageContainer>
              <MessageList
                currentUserId={`customer_${location?.state.customerID}`} messages={messages}
              />
            </MessageContainer>
          </MainContainer>
        </MinChatUiProvider>
      </div>
    </>
  );
};

export default ChatSummary;