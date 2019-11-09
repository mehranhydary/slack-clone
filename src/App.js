import React, { useState } from 'react'
import ChatScreen from './ChatScreen'
import UsernameForm from './components/UsernameForm'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import dotenv from 'dotenv'

dotenv.config()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6347'
    },
    secondary: {
        main: '#000000'
      }
    }
  },
)

function App() {
  const [currentScreen, setCurrentScreen] = useState('WhatIsYourUsernameScreen')
  const [currentUsername, setCurrentUsername] = useState('')
  
  const onUsernameSubmitted = (username) => {
    fetch(process.env.REACT_APP_SERVER_URL + '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    })
    .then(response => {
      setCurrentScreen('ChatScreen')
      setCurrentUsername(username)
    })
    .catch(error => {
    })

  }
  
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          { 
            currentScreen === 'WhatIsYourUsernameScreen' 
          ? <UsernameForm onSubmit = {onUsernameSubmitted}/>
          : currentScreen === 'ChatScreen'
          ? <ChatScreen currentUsername={currentUsername}/>
          : null
          }
        </div>
      </MuiThemeProvider>
    )
}

export default App;
