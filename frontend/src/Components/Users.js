import React, { useContext, useEffect, useState } from 'react'
import "./styles.css";
import logo from "../Icons/Rekomendasi-Live-Chat-untuk-Website.png"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IconButton } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";
import { AnimatePresence, anticipate, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from "./MainContainer";

function Users(props) {

  const {refresh, setRefresh} = useContext(myContext);
  const [users,setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const nav = useNavigate();

  if(!userData){
    console.log("User not Authenticated");
    nav(-1);
  }

  useEffect(()=>{
    console.log("Refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get("http://localhost:3000/api/users/fetchUsers", config).then((data) => {
      console.log("user data refreshed");
      setUsers(data.data);
    });
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className='list-container'>
        <div className={"ug-header" + (props.lightTheme?"":" dark")}>
          <img src={logo} alt='' style={{height: '2rem',width: '2rem',marginLeft: '10px'}}/>
          <p className={"ug-title" + (props.lightTheme?"":" dark")}>Online Users</p>
          <IconButton className={"icon" + (props.lightTheme?"":" dark")} onClick={()=>{setRefresh(!refresh);}}>
            <RefreshIcon/>
          </IconButton>
        </div>
        <div className={"sb-search" + (props.lightTheme?"":" dark")}>
          <IconButton className={"icon" + (props.lightTheme?"":" dark")}>
              <ManageSearchIcon/>
          </IconButton>
          <input placeholder='Search' className={"search-box" + (props.lightTheme?"":" dark")}/>
        </div>
        <div className="ug-list">
          {users.map((user, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.9 }}
                className={"list-item" + (props.lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with ", user.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post(
                    "http://localhost:3000/api/chats/",
                    {
                      userId: user._id,
                    },
                    config
                  );
                }}
              >
                <p className={"con-icon" + (props.lightTheme ? "" : " dark")} style={{marginRight: '10px'}}>{user.name[0]}</p>
                <p className={"con-title" + (props.lightTheme ? "" : " dark")}>
                  {user.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Users
