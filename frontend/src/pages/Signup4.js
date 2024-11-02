import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup4.css';

const Signup4 = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 페이지로 이동하는 로직 추가
    alert('로그인 페이지로 이동합니다.');
    navigate('/login');
  };

  return (
    <div className="signup4-container">
      <div className="signup4-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup4-logo" />
      </div>
      <div className="signup4-message">
        <h1>회원가입이 완료되었습니다.</h1>
      </div>
      <button onClick={handleLogin} className="signup4-button">로그인</button>
    </div>
  );
};

export default Signup4;