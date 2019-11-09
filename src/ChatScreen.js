import React, { useState, useEffect } from 'react'
import Chatkit from '@pusher/chatkit-client'
import SendMessageForm from './components/SendMessageForm'
import MessageList from './components/MessageList'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    whosOnlineListTitle: {
      marginLeft: theme.spacing(2)
    },
  }));

function ChatScreen (props) {
    const classes = useStyles()
    const [messages, setMessages] = useState([])
    const [currentRoom, setCurrentRoom] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [usersWhoAreTyping, setUsersWhoAreTyping] = useState([])
    
    useEffect(() => {
        const chatManager = props.currentUsername !== '' ? 
        new Chatkit.ChatManager({
            instanceLocator: process.env.REACT_APP_PUSHER_INSTANCE_LOCATOR,
            userId: props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: process.env.REACT_APP_SERVER_URL + '/authenticate'
            })
        })
        : null 
        if(chatManager)
            chatManager 
                .connect()
                .then(async currentUser => {
                    setCurrentUser(currentUser)
                    return await currentUser.subscribeToRoom({
                        roomId: process.env.REACT_APP_ROOM_ID,
                        messageLimit: 100,
                        hooks: {
                            onMessage: message => {
                                setMessages(messages => [...messages, message]);
                            },
                            onUserStartedTyping: user => {
                                setUsersWhoAreTyping(usersWhoAreTyping => [...usersWhoAreTyping, user.name]);
                            },
                            onUserStoppedTyping: user => {
                                setUsersWhoAreTyping(usersWhoAreTyping => usersWhoAreTyping.filter(username => username !== user.name))
                            },
                            onUserCameOnline: () => this.forceUpdate() ,
                            onUserWentOffline: () => this.forceUpdate() ,
                            onUserJoined: () => this.forceUpdate() 
                        }
                    })
                })
                .then(currentRoom => {
                    setCurrentRoom(currentRoom)
                    console.log(currentRoom)
                })
                .catch(err => console.error(err))
    }, [props.currentUsername])
    function sendMessage(text) {
        currentUser.sendMessage({
            roomId: currentRoom.id,
            text
        })
    }
    function sendTypingEvent() {
        currentUser
            .isTypingIn({roomId: currentRoom.id})
            .catch(err => console.error('Error:', err))
    }

    return(
        <div
            style={{
                display:'flex'
            }}
        >
            <div
                style={{
                    width:'30%',
                    backgroundColor: 'tomato'
                }}
                
            >
                <h1 className={classes.whosOnlineListTitle}>Who's online list</h1>
                <WhosOnlineList 
                    users={currentRoom.users}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div
                    style={{
                        flex: 1
                    }}
                >
                    <MessageList currentUsername={props.currentUsername} messages={messages}/>
                </div>
                <TypingIndicator usersWhoAreTyping={usersWhoAreTyping} />
                <SendMessageForm
                    onSubmit = {sendMessage}
                    onChange = {sendTypingEvent}
                />
            </div>
        </div>
    )
}
export default ChatScreen