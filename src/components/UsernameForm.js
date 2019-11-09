import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  gridItem: {
    marginTop: theme.spacing(40),
    marginLeft: theme.spacing(60),
  }
}));

function UsernameForm(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(username)
  }
  
  const onChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  return (
    <Grid container>
      <Grid item className={classes.gridItem}>
        <form onSubmit={onSubmit} className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-basic"
              className={classes.textField}
              label="What is your username?"
              margin="normal"
              onChange={onChange}
            />
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default UsernameForm;
