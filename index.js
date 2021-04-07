// back-end 시작점!! 
// 1. node js download
// 2. express js download
// 3. body-parser (client로 부터 id, email, pwd 등의 정보를 읽어 들이는 것)

const express = require('express') // express module을 가져옴
const app = express() // 새로운 express app을 만든다.
const port = 5000

const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require('./config/key');

// 받아온 정보들을 parsing 한다.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// MongoDB connection
const mongoose = require('mongoose');
// mongoose.connect(config.mongoURI, {
//     useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
// }).then(()=> console.log("MongoDB connected... "))
//   .catch(err=>console.log(err))

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("mongoose.connect :: MongoDB connected ! "))
  .catch(error => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World! from Express JS (boiler plate)')
})

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client 에서 가져오면 
    // 그것들을 DB에 넣어준다.
    const user = new User(req.body);

    // save 하기 전에 password를 암호화 해준다. bcrpyt 사용해서 한다.
    // User.js 에서 userSchema.pre('save', function() { ... } 를 사용한다. 


    // save <--- mongo db 에서 온 method 이다.
    // next() 이후에 user.save로 들어 온다.
    user.save((err, userInfo)=>{
      if(err){
          return res.json({ success: false, err });
      }
      return res.status(200).json({ success: true });    
    });
})

app.post('/login', (req, res) => {
  // 1. 요청된 이메일을 db에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false, 
        message: "There is no user containing E-Mail."
      })
    }

    // 2. db에 이메일이 있다면, 비밀번호가 같은지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({ 
          loginSuccess: false, 
          message: "Password is wrong!"
        })
      }
      // 3. 비밀번호가 맞다면, user를 위한 token을 생성한다.
      user.generateToken((err, user) => {
        
      })

    })
  })

 

  
})

app.listen(port, () => {
  console.log(`app.listen :: Example app listening at http://localhost:${port}`)
})

