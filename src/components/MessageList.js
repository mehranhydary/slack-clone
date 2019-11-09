import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    messageList: {
      marginLeft: theme.spacing(2)
    },
  }));


function MessageList (props) {
    const classes = useStyles()
    return(
        <div className={classes.messageList}>
            <h1>
                Chat
            </h1>
            <h3>Hi, {props.currentUsername}</h3>
            {
                props.messages.map((message, index) => {
                    return(
                        <div>
                            <span style={{fontWeight:'bold'}}>{message.senderId}</span>: {message.text}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default MessageList