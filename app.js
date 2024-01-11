import express from 'express'
import register from './route/users/register.js' 

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 3000
app.use('/', register)


app.listen(port, ()=>{
    console.log(`App listening on port : ${port}`)
})