import React from 'react';
import './LoginFail.css';

const LoginFail = () => {
  return (
    <div className="login-fail-container">
      <div className="login-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="login-logo" />
        <h1 id="login-title">로그인</h1>
      </div>
      <div className="login-form">
        <label htmlFor="userId">아이디</label>
        <input type="text" id="userId" placeholder="아이디" disabled />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호" disabled />
        <p className="error-message">! 아이디 또는 비밀번호가 틀렸습니다</p>
        <button className="login-button" disabled>로그인</button>
      </div>
      <div className="login-links">
        <a href="/find-id">아이디/비밀번호 찾기</a>
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
};

export default LoginFail;
