const { User } = require('../models/User');

let auth = (req, res, next) => {
  // auth 처리를 하는 곳 

  // 클라이언트 쿠키에서 token을 가져옴
  let token = req.cookies.x_auth;

  // token을 복호화 한 후에 user를 찾는다.
  User.findByToken()
  // user가 있으면 auth 성공

  // user가 없으면 auth 실패
  

}

module.exports = { auth };