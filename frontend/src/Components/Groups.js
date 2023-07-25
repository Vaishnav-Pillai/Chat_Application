import React, { useContext, useEffect, useState } from 'react'
import "./styles.css";
import logo from "../Icons/Rekomendasi-Live-Chat-untuk-Website.png"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IconButton } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";
import { AnimatePresence, anticipate, motion } from 'framer-motion';
import { myContext } from './MainContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Groups(props) {

  const { refresh, setRefresh } = useContext(myContext);

  const [groups, SetGroups] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  const user = userData.data;
  useEffect(() => {
    console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("http://localhost:3000/api/chats/fetchGroups", config)
      .then((response) => {
        console.log("Group Data from API ", response.data);
        SetGroups(response.data);
      });
  }, [refresh]);


  return (
    <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className='list-container'>
        <div className={"ug-header" + (props.lightTheme?"":" dark")}>
          <img src={logo} alt='' style={{height: '2rem',width: '2rem'}}/>
          <p className={"ug-title" + (props.lightTheme?"":" dark")}>Available Groups</p>
          <IconButton
            className={"icon" + (props.lightTheme ? "" : " dark")}
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"sb-search" + (props.lightTheme?"":" dark")}>
          <IconButton>
              <ManageSearchIcon/>
          </IconButton>
          <input placeholder='Search' className={"search-box" + (props.lightTheme?"":" dark")}/>
        </div>

        <div className="ug-list">
          {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.9 }}
                className={"list-item" + (props.lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.name);
                  // const config = {
                  //   headers: {
                  //     Authorization: `Bearer ${userData.data.token}`,
                  //   },
                  // };
                  // axios.post(
                  //   "http://localhost:8080/chat/",
                  //   {
                  //     userId: user._id,
                  //   },
                  //   config
                  // );
                }}
              >
                <p className={"con-icon" + (props.lightTheme ? "" : " dark")} style={{marginRight: '10px'}}>{group.chatName[0]}</p>
                <p className={"con-title" + (props.lightTheme ? "" : " dark")}>
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Groups
