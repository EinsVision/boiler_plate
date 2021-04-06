// back-end 시작점!! 
// 1. node js download
// 2. express js download  ( 5: 55)

const express = require('express') // express module을 가져옴
const app = express() // 새로운 express app을 만든다.
const port = 5000

const {User} = require("./models/User");
const bodyParser = require("body-parser");

const config = require('./config/key');

// 받아온 정보들을 parsing 한다.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("MongoDB connected... "))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! Node JS')
})

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client 에서 가져오면 
    // 그것들을 DB에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo)=>{
        if(err){
            return res.json({success: false, err});
        }
        return res.status(200).json({success: true});    
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

