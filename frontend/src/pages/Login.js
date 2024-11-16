import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ setIsLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/login', {
        userID: userId,
        userPassword: password,
      });

      if (response.data.success) {
        // 로그인 성공
        setIsLogin(true);
        setLoginFail(false);
        setErrorMessage('');
        // 성공적인 로그인을 처리한 후 홈으로 이동
        navigate('/home');
      } else {
        // 로그인 실패
        setIsLogin(false);
        setLoginFail(true);
        setErrorMessage(response.data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 또는 서버 오류 처리
      setIsLogin(false);
      setLoginFail(true);
      setErrorMessage(
        error.response?.data?.message || '서버와의 통신 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className={loginFail ? 'login-fail-container' : 'login-container'}>
      <div className="login-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="login-logo" />
        <h1 id="login-title">로그인</h1>
      </div>
      <div className="login-form">
        <label htmlFor="userId">아이디</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        {loginFail && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin} className="login-button">
          로그인
        </button>
      </div>
      <div className="login-links">
        <a href="/find-id">아이디/비밀번호 찾기</a>
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
};

export default Login;
