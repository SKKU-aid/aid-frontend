import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleIdCheck = () => {
    // 중복 확인 로직 추가 (예: API 호출 등)
    alert('아이디 중복 확인 기능은 아직 구현되지 않았습니다.');
  };

  const handleSignup = () => {
    // 회원가입 로직 추가 (예: 입력 값 확인, API 호출 등)
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      navigate('/signup2'); // Signup2 페이지로 이동
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup-logo" />
        <h1 id="signup-title">회원가입</h1>
      </div>
      <div className="signup-form">
        <label htmlFor="userId">아이디</label>
        <div className="userId-input-container">
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
          <button onClick={handleIdCheck} className="id-check-button">중복확인</button>
        </div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <button onClick={handleSignup} className="signup-button">다음</button>
      </div>
    </div>
  );
};

export default Signup;
