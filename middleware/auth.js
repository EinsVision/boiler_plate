// middleware 
// callback function이 호출되기 전에 중간에서 먼저 작업을 해주는 것이다.

const { User } = require('../models/User');

let auth = (req, res, next) => {
  // auth 처리를 하는 곳 
  // auth가 왜 필요한가? 
  // 1. 페이지 이동 때마다 로그인되었는지 안되었는지, 관리자 유저인지등을 확인한다.
  // 2. 글을 쓰거나 지울때 권한이 있는지 확인한다.

  // Server: DB에 token을 갖는다. Client: Cookie에 token을 갖는다. 그래서 계속 맞는지 check!
  
  // 클라이언트 쿠키에서 token을 가져옴
  let token = req.cookies.x_auth;

  // token을 복호화 한 후에 user를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) {
      throw err;
    } // error가 있다면 error 처리를 한다.

    if(!user) {
      return res.json({ isAuth: false, error: true });
    } // user가 없다면 res에 error 메세지를 전송한다.

    req.token = token;
    req.user = user;
    next(); // next가 있어야 middleware에 갇히는 것을 방지할 수 있다.
  });

  // user가 있으면 auth 성공

  // user가 없으면 auth 실패
  

}

module.exports = { auth };