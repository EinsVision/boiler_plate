import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// (Redux) 는 State를 관리하는 것이다.
// Redux 데이터 Flow (strict unidirectional data flow)
// React Component -> Dispatch(action) -> Action -> Reducer -> Store -> React Component
 
// (Props) 는 부모 component와 자식 component 간에 주고 받는 data이고 Props는 immutable 해서 값을 바꾸고 싶다면 부모 component에서 값을 변경해 한다.

// (State) 는 그 component 안에서 데이터를 전달할 때 사용한다. 예를 들어 검색 창에 글을 입력할 때 글이 변하는것은 state를 바꾸는 것이다. State는 mutable 하다.
// 그리고 state는 변하면 re-rendering 된다.  