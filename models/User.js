const mongoose = require('mongoose');
// Schema: 각 각의 정보를 변경할 수 있는 요소 

const bcrypt = require('bcrypt'); // 비밀번호를 암호화 한다.
const saltRounds = 10;

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

userSchema.pre('save', function( next ) {

  const user = this;

  // 비밀번호를 암호화 시킨다.
  if(user.isModified('password')) { // password가 변경될 때만 암호화를 한다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) {
        return next(err);
      }                                             // hash가 암호화된 비밀번호이다.
      bcrypt.hash( user.password, salt, function(err, hash) {
        if(err) {
          return next(err);
        }
        user.password = hash; // hash로 암호화된 비밀번호가 생성되면 password 를 교체해준다.
        next();
      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // 여기서 plainPassword를 암호화해서 암호화된 비밀번호와 비교해야 한다.
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema); // Model을 schema로 감싼다.
module.exports = { User };