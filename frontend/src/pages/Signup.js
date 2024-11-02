import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { Button, Box, Modal, Typography } from '@mui/material';
import CustomTextField from './CustomMUI/CustomTextField';

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isDisabled = !isUsernameAvailable || password === '' || password !== passwordConfirm;
  const navigate = useNavigate();

  const handleIdCheck = () => {
    if (userId === '') {
      setIsUsernameAvailable(false);
      setModalOpen(true);
      setAlertMessage('다른 아이디를 입력해주세요.');
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } else {
      setIsUsernameAvailable(true);
      setAlertMessage('사용 가능한 아이디입니다.');
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    }
  };

  const handleSignup = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      navigate('/signup2');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup-logo" />
        <h1 id="signup-title">회원가입</h1>
      </div>
      <form className="signup-form" style={{ position: 'relative' }}>
        <CustomTextField
          type="text"
          placeholder="아이디"
          required
          sx={{ mb: 3, mt: 3 }}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button
          variant="text"
          onClick={handleIdCheck}
          sx={{ color: '#505050', fontWeight: 700, position: 'absolute', top: 8, right: 15, zIndex: 1 }}
        >
          중복확인
        </Button>
        <CustomTextField
          type="password"
          placeholder="비밀번호"
          required
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomTextField
          type="password"
          placeholder="비밀번호 확인"
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
            onClick={handleSignup}
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
            다음
          </Button>
        </Box>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 3px 6px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6">{alertMessage}</Typography>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Signup;
