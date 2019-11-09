import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// import './App.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

}));

function SendMessageForm(props) {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(message)
    setMessage('')
  }
  
  const onChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
    props.onChange()
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            variant='outlined'
            id="standard-basic"
            className={classes.textField}
            label="Message"
            margin="normal"
            onChange={onChange}
            value={message}
          />
        </div>
      </form>
    </div>
  );
}

export default SendMessageForm;
