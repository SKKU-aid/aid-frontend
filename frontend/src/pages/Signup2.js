import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup2.css';
import {
  Button,
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from '@mui/material';

const majorOptions = [
  '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과', '국제통상학전공', '소비자학과',
  '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
  '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
  '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
  '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
  '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
  '사회복지학과', '사회학과', '심리학과',
  '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
  '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
  '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
  '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
  '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
];

const Signup2 = () => {
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [academicStatus, setAcademicStatus] = useState('');

  const navigate = useNavigate();

  const isDisabled = gender === '' || birthDate === '' || email === '' || major === '' || currentSemester === '' || academicStatus === '';

  const handleNext = () => {
    let formattedBirth = birthDate;
    
    if (birthDate.length === 10) {
      formattedBirth = `${birthDate}T00:00:00`;
    } else if (birthDate.length === 8) {
      formattedBirth = `${birthDate.slice(0, 4)}-${birthDate.slice(4, 6)}-${birthDate.slice(6, 8)}T00:00:00`;
    }



    const step2Data = {
      gender,
      birthDate: formattedBirth,
      email,
      major,
      currentSemester,
      academicStatus,
    };

    localStorage.setItem('gender', gender);
    localStorage.setItem('birthDate', formattedBirth);
    localStorage.setItem('email', email);
    localStorage.setItem('major', major);
    localStorage.setItem('currentSemester', currentSemester);
    localStorage.setItem('academicStatus', academicStatus);

    navigate('/signup3');
    console.log('step2Data', step2Data);
  };

  return (
    <div className="signup2-container" style={{padding: '65px 40px'}}>
      <div className="signup2-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup2-logo" />
        <h1 id="signup2-title">기본 정보 입력</h1>
      </div>
      <form className="signup2-form">
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={(e, newGender) => setGender(newGender)}
          aria-label="gender"
          sx={{ mb: 3 }}
          fullWidth
        >
          <ToggleButton value="남" aria-label="male" sx={{ '&.Mui-selected': { backgroundColor: '#ebfcdc'} }}>남</ToggleButton>
          <ToggleButton value="여" aria-label="female" sx={{ '&.Mui-selected': { backgroundColor: '#ebfcdc'} }}>여</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          type="text"
          label="생년월일"
          placeholder="YYYY-MM-DD"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            notched: false,
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          type="email"
          label="이메일"
          placeholder="IamSungKyun@g.skku.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            notched: false,
          }}
          sx={{ mb: 3 }}
        />
        <Autocomplete
          value={major || null}
          onChange={(event, newValue) => setMajor(newValue)}
          options={majorOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="전공"
              placeholder="전공을 검색하세요"
              fullWidth
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                notched: false,
              }}
              sx={{ mb: 3 }}
            />
          )}
        />
        <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
          <InputLabel id="semester-select-label">현재 학기</InputLabel>
          <Select
            labelId="semester-select-label"
            id="semester-select"
            value={currentSemester}
            label="현재 학기"
            onChange={(e) => setCurrentSemester(e.target.value)}
          >
            <MenuItem value={1}>1학기</MenuItem>
            <MenuItem value={2}>2학기</MenuItem>
            <MenuItem value={3}>3학기</MenuItem>
            <MenuItem value={4}>4학기</MenuItem>
            <MenuItem value={5}>5학기</MenuItem>
            <MenuItem value={6}>6학기</MenuItem>
            <MenuItem value={7}>7학기</MenuItem>
            <MenuItem value={8}>8학기</MenuItem>
            <MenuItem value={9}>9학기 이상</MenuItem>
          </Select>
        </FormControl>
        <ToggleButtonGroup
          value={academicStatus}
          exclusive
          onChange={(e, newStatus) => setAcademicStatus(newStatus)}
          aria-label="academic status"
          sx={{ mb: 3 }}
          fullWidth
        >
          <ToggleButton value="재학" aria-label="enrolled" sx={{ '&.Mui-selected': { backgroundColor: '#ebfcdc'} }}>재학</ToggleButton>
          <ToggleButton value="휴학" aria-label="absence" sx={{ '&.Mui-selected': { backgroundColor: '#ebfcdc'} }}>휴학</ToggleButton>
          <ToggleButton value="수료" aria-label="completion" sx={{ '&.Mui-selected': { backgroundColor: '#ebfcdc'} }}>수료</ToggleButton>
        </ToggleButtonGroup>
        <Box mt={2}>
          <Button
            variant="standard"
            fullWidth
            disabled={isDisabled}
            onClick={handleNext}
            sx={{
              backgroundColor: isDisabled ? 'transparent' : '#388E3C',
              '&:hover': {
                backgroundColor: isDisabled ? 'transparent' : '#2E7D32',
              },
              color: isDisabled ? '#505050' : 'white',
              p: 1,
              fontSize: '16px',
            }}
          >
            다음
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup2;
