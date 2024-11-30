import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindId.css';
import axios from 'axios';

const FindId = () => {
  const [userId, setUserId] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerateId = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/users/${userId}/verify`, {
        userID: userId,
      });

      if (response.data.success) {
        // 인증번호 전송 성공
        setErrorMessage('');
        // localStorage에 userID 저장
        localStorage.setItem('findID', userId);
        // 
        navigate('/find-id2');
      } else {
        // 인증번호 전송 실패
        setLoginFail(true);
        setErrorMessage(response.data.message || '인증번호 전송에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 또는 서버 오류 처리
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
        <h1 id="login-title">비밀번호 찾기</h1>
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
        {loginFail && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleGenerateId} className="login-button">
          확인
        </button>
      </div>
    </div>
  );
};

export default FindId;
