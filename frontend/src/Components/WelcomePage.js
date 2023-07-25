import React from 'react';
import "./styles.css";
import logo from "../Icons/Rekomendasi-Live-Chat-untuk-Website.png"
import { AnimatePresence, anticipate, motion } from 'framer-motion';

function WelcomePage(props) {

  console.log(JSON.parse(localStorage.getItem("userData")));
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  return (
    <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className={"welcome-container" + (props.lightTheme?"":" dark")}>
        <img src={logo} alt='logo' className='welcome-logo'/>
        <b>Kudos {userData.data.name} !!</b>
        <p>
          View People, Chat with Them, Create Groups and Enjoy!!
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomePage
