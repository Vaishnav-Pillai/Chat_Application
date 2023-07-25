import React, { useState } from 'react';
import "./styles.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { AnimatePresence, anticipate, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateGroups(props) {

  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("User Data from CreateGroups : ", userData);

  const createGroup = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.post(
      "http://localhost:3000/api/chats/createGroups",
      {
        name: groupName,
        users: '["64be52893245383fac0411c8","64be5f1235e50e80a06b09cc"]',
      },
      config
    );
    nav("/app/groups");
  };

  return (
    <AnimatePresence>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className={"createGroups-container" + (props.lightTheme?"":" dark")}>
        <input placeholder='Enter Name of your Group' className={"search-box" + (props.lightTheme?"":" dark")} onChange={(e) => {setGroupName(e.target.value);}}/>
        <IconButton>
          <TaskAltIcon className={"icon" + (props.lightTheme?"":" dark")} onClick={() => {handleClickOpen();}}/>
        </IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default CreateGroups
