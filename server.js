const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator : 'v1:us1:de31f495-e277-4ef0-9270-e7d366841f94v1:us1:de31f495-e277-4ef0-9270-e7d366841f94',
  key : '4aecafaf-0bc5-4d4b-aec0-487d60acd15c:vPQ2Tz6uiwhAMx3tABGWnpA3iCx2gnCkNhFyc74H7sQ=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/Users',(req,res)=>{
  const {username}  = req.body


Chatkit
  .createUser({
    name : username ,
    id: username
  })
  .then(()=>res.sendStatus(201))
  .catch(error => {
    if(error.error_type === 'services/chatkit/user_already_exists'){
      res.sendStatus(200)
    } else {
      res.status(error.statusCode).json(error)
    }
  })
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
