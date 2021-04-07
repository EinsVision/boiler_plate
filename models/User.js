const mongoose = require('mongoose');
// Schema: 각 각의 정보를 변경할 수 있는 요소 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // space 없애는 역활
        unique: 1   // 똑같은 email은 쓰지 못하게 만든다.
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
        // role 관리자가 될 수 도 있고, 일반 user가 될 수 도 있다.
    },
    image: {
        type: String
    },
    token: {
        type: String // 유효성을 관리한다.
    },
    tokenExp: {
        type: Number
        // token 유효기간을 설정한다.
    }
})

const User = mongoose.model('User', userSchema); // Model을 schema로 감싼다.
module.exports = { User };