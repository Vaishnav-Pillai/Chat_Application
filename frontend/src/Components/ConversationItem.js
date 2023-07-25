import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, anticipate, motion } from 'framer-motion';

function ConversationItem({ props }) {

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: anticipate, duration: "0.5"}} className='conversation-container' onClick={()=>{navigate("chat")}}>
        <p className='con-icon'>{props.name[0]}</p>
        <p className='con-title'>{props.name}</p>
        <p className='con-lastMessage'>{props.lastMessage}</p>
        <p className='con-timeStamp'>{props.timeStamp}</p>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConversationItem
