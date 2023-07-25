import React, { useContext, useEffect, useState } from 'react'
import "./styles.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import { myContext } from './MainContainer';
import axios from 'axios';

function Sidebar(props) {

  const navigate = useNavigate();
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  console.log("Context API : refresh : ", refresh);
  const [conversations, setConversations] = useState([]);
  // console.log("Conversations of Sidebar : ", conversations);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  const user = userData.data;
  useEffect(() => {
    // console.log("Sidebar : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:3000/api/chats/", config).then((response) => {
      console.log("Data refresh in sidebar ", response.data);
      setConversations(response.data);
      // setRefresh(!refresh);
    });
  }, [refresh]);

  return (
    <div className='sidebar-container'>
      <div className={"sb-header" + (props.lightTheme?"":" dark")}>
        <div>
            <IconButton onClick={()=>{navigate("welcome")}}>
                <AccountCircleIcon className={"icon" + (props.lightTheme?"":" dark")}/>
            </IconButton>
        </div>

        <div>
            <IconButton onClick={()=>{navigate("users")}}>
                <PersonAddIcon className={"icon" + (props.lightTheme?"":" dark")}/>
            </IconButton>
            <IconButton onClick={()=>{navigate("groups")}}>
                <GroupAddIcon className={"icon" + (props.lightTheme?"":" dark")}/>
            </IconButton>
            <IconButton onClick={()=>{navigate("create-groups")}}>
                <AddCircleOutlineIcon className={"icon" + (props.lightTheme?"":" dark")}/>
            </IconButton>
            <IconButton onClick={()=>{props.setLightTheme((prevValue)=>{return !prevValue;});}}>
                {props.lightTheme && <Brightness4Icon className={"icon" + (props.lightTheme?"":" dark")}/>}
                {!props.lightTheme && <Brightness7Icon className={"icon" + (props.lightTheme?"":" dark")}/>}
            </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (props.lightTheme?"":" dark")}>
        <IconButton>
            <ManageSearchIcon/>
        </IconButton>
        <input placeholder='Search' className={"search-box" + (props.lightTheme?"":" dark")}/>
      </div>
      <div className={"sb-conversations" + (props.lightTheme?"":" dark")}>
        {conversations.map((conversation, index) => {
            // console.log("current convo : ", conversation);
            if (conversation.users.length === 1) {
                return <div key={index}></div>;
              }
              if (conversation.latestMessage === undefined) {
                // console.log("No Latest Message with ", conversation.users[1]);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log("Refresh fired from sidebar");
                      // dispatch(refreshSidebarFun());
                      setRefresh(!refresh);
                    }}
                  >
                    <div
                      key={index}
                      className="conversation-container"
                      onClick={() => {
                        navigate(
                          "chat/" +
                            conversation._id +
                            "&" +
                            conversation.users[1].name
                        );
                      }}
                      // dispatch change to refresh so as to update chatArea
                    >
                      <p className={"con-icon" + (props.lightTheme ? "" : " dark")}>
                        {conversation.users[1].name[0]}
                      </p>
                      <p className={"con-title" + (props.lightTheme ? "" : " darkTitle")}>
                        {conversation.users[1].name}
                      </p>          

                      <p className="con-lastMessage">
                        No previous Messages, click here to start a new chat
                      </p>
                      {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                    {conversation.timeStamp}
                  </p> */}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="conversation-container"
                    onClick={() => {
                      navigate(
                        "chat/" +
                          conversation._id +
                          "&" +
                          conversation.users[1].name
                      );
                    }}
                  >
                    <p className={"con-icon" + (props.lightTheme ? "" : " dark")}>
                      {conversation.users[1].name[0]}
                    </p>
                    <p className={"con-title" + (props.lightTheme ? "" : " darkTitle")}>
                      {conversation.users[1].name}
                    </p>            

                    <p className="con-lastMessage">
                      {conversation.latestMessage.content}
                    </p>
                    {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                    {conversation.timeStamp}
                  </p> */}
                  </div>
                );
              }
        })}
      </div>
    </div>
  )
}

export default Sidebar
