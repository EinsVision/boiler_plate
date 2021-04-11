import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

  // LandingPage에 들어오자마 useEffcet를 실행한다.
  useEffect(()=>{
    axios.get('/api/hello') //server로 보내는 함수이다.
    .then(response => console.log(response.data))
  }, []);

  // CORS 정책 때문에, Cross-Origin Resource Sharing (CORS) 보안문제
  
  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage;
