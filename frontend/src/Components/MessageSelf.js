import React from 'react'

function MessageSelf({ props }) {
  return (
    <div className='self-message-container'>
      <div className='messageBox'>
        <p style={{fontSize: '20px'}}>{props.content}</p>
        <p className='self-timeStamp'>12:00 am</p>
      </div>
    </div>
  )
}

export default MessageSelf
