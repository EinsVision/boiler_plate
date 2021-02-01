// back-end 시작점!

const express = require('express') // express module을 가져옴
const app = express() // 새로운 express app을 만든다.
const port = 5000

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://changdae:abcd1234@reactblog.k6uku.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("MongoDB connected... "))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! Node JS')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

