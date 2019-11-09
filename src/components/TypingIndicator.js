import React from 'react'

function TypingIndicator(props) {
    if(props.usersWhoAreTyping.length ===0) {
        return <div />
    } else if(props.usersWhoAreTyping.length === 1) {
        return <p>{props.usersWhoAreTyping[0]} is typing...</p>
    } else if(props.usersWhoAreTyping.length > 1) {
        return <p>{props.usersWhoAreTyping.join( ' and ')} are typing...</p>
    }
}

export default TypingIndicator