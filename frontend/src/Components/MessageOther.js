import React from 'react';
import "./styles.css";

function MessageOther({ props }) {
  return (
    <div className='other-message-container'>
      <div className='conversation-container'>
            <p className='con-icon'>{props.sender.name[0]}</p>
            <div className='other-text-content'>
                <p className='con-title'>{props.sender.name}</p>
                <p className='con-lastMessage' style={{fontSize: '20px'}}>{props.content}</p>
                {/* <p className='self-timeStamp'>12:00 am</p> */}
            </div>
        </div>
    </div>
  )
}

export default MessageOther
