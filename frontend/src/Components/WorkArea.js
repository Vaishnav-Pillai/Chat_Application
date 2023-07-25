import React, { useContext, useEffect, useRef, useState } from 'react'
import "./styles.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import { IconButton, Skeleton } from '@mui/material';
import { useParams } from "react-router-dom";
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { AnimatePresence, anticipate, motion } from 'framer-motion';
import { myContext } from "./MainContainer";
import axios from 'axios';
import io from "socket.io-client";

var socket;
function WorkArea(props) {
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  // console.log(chat_id, chat_user);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  // console.log("Chat area id : ", chat_id._id);
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);


  const sendMessage = () => {
    var data = null;
    // console.log("SendMessage Fired to", chat_id._id);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "http://localhost:3000/api/messages/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        data = data;
        console.log("Message Fired");
      });
    socket.emit("new message", data)
  };
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(()=>{
    socket = io("http://localhost:8080");
    socket.emit("setup",userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if(!allMessagesCopy || allMessagesCopy._id !== newMessage._id){

      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  });

  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("http://localhost:3000/api/messages/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit("join chat", chat_id);
        // console.log("Data from Acess Chat API ", data);
      });
      setAllMessagesCopy(allMessages);
    // scrollToBottom();
  }, [refresh, chat_id, userData.data.token, allMessages]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
        <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className={"workArea-container" + (props.lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (props.lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (props.lightTheme ? "" : " dark")}>
            {chat_user[0]}
          </p>
          <div className={"header-text" + (props.lightTheme ? "" : " dark")}>
            <p className={"con-title" + (props.lightTheme ? "" : " dark")}>
              {chat_user}
            </p>
            {/* <p className={"con-timeStamp" + (props.lightTheme ? "" : " dark")}>
              {props.timeStamp}
            </p> */}
          </div>
          <IconButton className={"icon" + (props.lightTheme ? "" : " dark")}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
        <div className={"messages-container" + (props.lightTheme ? "" : " dark")}>
          {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                // console.log("I sent it ");
                return <MessageSelf props={message} key={index} />;
              } else {
                // console.log("Someone Sent it");
                return <MessageOther props={message} key={index} />;
              }
            })}
        </div>
        <div ref={messagesEndRef} className="BOTTOM" />
        <div className={"text-input-area" + (props.lightTheme ? "" : " dark")}>
          <input
            placeholder="Type a Message"
            className={"search-box" + (props.lightTheme ? "" : " dark")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                // console.log(event);
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }
            }}
          />
          <IconButton
            className={"icon" + (props.lightTheme ? "" : " dark")}
            onClick={() => {
              sendMessage();
              setRefresh(!refresh);
            }}
          >
            <IosShareIcon />
          </IconButton>
        </div>
      </motion.div>
      </AnimatePresence>
    );
  }
}

export default WorkArea
