import express from 'express'
import register from './route/users/register.js' 
import login from './route/users/login.js'
import bot from './route/bots/createBot.js'
import poste from './route/postes/posteUser.js'
import posteBot from './route/postes/posteBot.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 3000
app.use('/', register)
app.use('/', login)
app.use('/', bot)
app.use('/', poste)
app.use('/', posteBot)

app.listen(port, ()=>{
    console.log(`App listening on port : ${port}`)
})