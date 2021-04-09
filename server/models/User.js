const mongoose = require('mongoose');
// Schema: 각 각의 정보를 변경할 수 있는 요소 

const bcrypt = require('bcrypt'); // 비밀번호를 암호화 한다.
const saltRounds = 10;

// json web token ! 
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateToken = function(cb) {
  // jsonwebtoken을 이용해서 token을 생성하기
  const user = this;

  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;

  user.save(function(err, user) {
    if(err) {
      return cb(err)
    }
    cb(null, user);
  })
}

userSchema.statics.findByToken = function( token, cb) {
  const user = this;

  // token decoding (복호화 과정)
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // user id를 이용해서 user를 찾은 다음에 
    // client에서 가져온 token과 DB에 저장된 token이 일치하는지 확인
    
    user.findOne({ "_id": decoded, "token": token }, function( err, user) {
      if(err) {
        return cb(err);
      } 

      cb(null, user);
    })
  })
}

const User = mongoose.model('User', userSchema); // Model을 schema로 감싼다.
module.exports = { User };