const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//Requiring DB part
const db = require('./db')
db.on('error',console.error.bind(console,"Mongo DB connection Error"))

//Setting up Routes
const farmexRouter = require('./routes/farmexroute');
const questionroute = require('./routes/QueryRoute');
const answerRoute = require('./routes/AnswerRoute');

app.use('/api',farmexRouter);
app.use('/api1',questionroute);
app.use('/api2',answerRoute);

//Authentication Using Passport js
const passport = require('passport')
const cookieSession = require('cookie-session')
const authRoute = require('./Routes/GoogleauthRoute')
app.use("/auth",authRoute);
app.use(
    cookieSession({
      name : "session",
      keys : ["Lokesh"],
      maxAge : 24*60*60*100,
    })
)

app.use(passport.initialize())
app.use(passport.session())
const passportSetup = require("./passport")
 


//Connecting to the port 50000
app.get('/',(req,res)=>{
   res.json({status : "ok"})
})
app.listen(5000,()=>{console.log("Server running on port 5000")})
