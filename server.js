const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

dotenv.config()

const chatkit = new Chatkit.default({
    instanceLocator: process.env.PUSHER_INSTANCE_LOCATOR,
    key: process.env.PUSHER_SECRET_KEY
})

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    
    chatkit.createUser({
        id: username,
        name: username
    })
    .then(() => {
        res.sendStatus(201)
    })
    .catch(err => {
        if(err.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
        } else {
            console.log('I am here:;', err)
            res.sendStatus(err.status).json(err)
        }
    })
})

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
})

const port = process.env.PORT || 3002
app.listen(port, err => err ? console.err(err) : console.log(`Running on port ${port}`))