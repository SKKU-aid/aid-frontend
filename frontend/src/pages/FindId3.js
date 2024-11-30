import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindId3.css';
import { Button, Box, Modal, Typography } from '@mui/material';
import CustomTextField from './CustomMUI/CustomTextField';
import axios from 'axios';

const FindId3 = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const isDisabled = password === '' || password !== passwordConfirm;
  const navigate = useNavigate();

  // 아이디 중복 확인 함수
  const handleVerifyId = async () => {
    const userId = localStorage.getItem('findID');
    const verifyId = localStorage.getItem('verifyId');

    try {
      if (password !== passwordConfirm) {
        setAlertMessage('비밀번호가 일치하지 않습니다.');
        return;
      }

      const response = await axios.put(`http://localhost:8082/users/${userId}/change-pw`, {
        userID: userId,
        verifyCode: verifyId,
        updatePassword: password,
      });

      if (response.data.success) {
        // 비밀번호 변경 성공
        setAlertMessage('');

        // 입력한 정보를 localStorage에 저장
        // localStorage.setItem('userID', "");
    
        // 다음 단계로 이동
        navigate('/home');
      } else {
        // 인증번호 전송 실패
        // setLoginFail(true);
        setAlertMessage(response.data.message || '인증번호 전송에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 또는 서버 오류 처리
      // setLoginFail(true);
      setAlertMessage(
        error.response?.data?.message || '서버와의 통신 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup-logo" />
        <h1 id="signup-title">비밀번호 찾기</h1>
      </div>
      <form className="signup-form" style={{ position: 'relative' }}>
        <CustomTextField
          type="password"
          placeholder="새 비밀번호"
          required
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomTextField
          type="password"
          placeholder="새 비밀번호 확인"
          required
          sx={{ mb: 3 }}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <Box mt={2}>
          <Button
            variant="standard"
            fullWidth
            disabled={isDisabled}
            onClick={handleVerifyId}
            sx={{
              backgroundColor: isDisabled ? 'transparent' : '#228B22',
              '&:hover': {
                backgroundColor: isDisabled ? 'transparent' : '#006400',
              },
              color: isDisabled ? '#505050' : 'white',
              p: 1,
              fontSize: '16px',
            }}
          >
            확인
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FindId3;
