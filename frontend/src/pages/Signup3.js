import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup3.css';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Modal,
  Typography,
} from '@mui/material';
import axios from 'axios';

const cities = {
  서울: [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구',
    '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구',
  ],
  경기: [
    '가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시',
    '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주군', '연천군', '오산시', '용인시', '의왕시', '의정부시',
  ],
  강원: [
    '강릉시', '동해시', '속초시', '원주시', '춘천시', '태백시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군',
  ],
  충청: [
    '천안시', '청주시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '연기군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군',
  ],
  전라: [
    '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군',
  ],
  경상: [
    '통영시','포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군',
  ],
  광주: ['동구', '서구', '남구', '북구', '광산구'],
  대구: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  대전: ['동구', '중구', '서구', '유성구', '대덕구'],
  부산: [
    '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군',
  ],
  울산: ['중구', '남구', '동구', '북구', '울주군'],
  인천: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  제주: ['제주시', '서귀포시'],
  세종: ['세종시'],
};

const Signup3 = () => {
  const [overallGPA, setOverallGPA] = useState('');
  const [previousGPA, setPreviousGPA] = useState('');
  const [incomeBracket, setIncomeBracket] = useState('');
  const [residenceInfo, setResidenceInfo] = useState({ residence: '', city: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const isDisabled =
    !overallGPA ||
    !previousGPA ||
    !incomeBracket ||
    !residenceInfo.residence ||
    (cities[residenceInfo.residence] && !residenceInfo.city);

  const handleGPAChange = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 4.5) {
      setter(value);
    } else {
      setAlertMessage('평점은 0 이상 4.5 이하의 값을 입력해야 합니다.');
      setModalOpen(true);
    }
  };

  const handleNext = async () => {
    let formattedResidence = residenceInfo.residence;
    if (residenceInfo.city) formattedResidence += ` ${residenceInfo.city}`;

    const registrationData = {
      userID: localStorage.getItem('userID'),
      userPassword: localStorage.getItem('userPassword'),
      userEmail: localStorage.getItem('userID'),
      sex: localStorage.getItem('gender') === '남',
      birthday: localStorage.getItem('birthDate'),
      major: localStorage.getItem('major'),
      currentSemester: parseInt(localStorage.getItem('currentSemester'), 10),
      currentStatus: localStorage.getItem('academicStatus'),
      totalGPA: parseFloat(overallGPA),
      lastGPA: parseFloat(previousGPA),
      incomeLevel: parseInt(incomeBracket, 10),
      region: formattedResidence,
    };

    try {
      const response = await axios.post('http://localhost:8082/register', registrationData);
      
      console.log(response);
      if (response.data.success) {
        setAlertMessage('회원가입이 완료되었습니다!');
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          navigate('/signup4');
        }, 1500);
      } else {
        setAlertMessage(response.data.message || '회원가입 중 문제가 발생했습니다.');
        setModalOpen(true);
      }
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || '회원가입 요청 중 문제가 발생했습니다.'
      );
      setModalOpen(true);
    }
  };

  return (
    <div className="signup3-container">
      <div className="signup3-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup2-logo" />
        <h1 id="signup3-title">추가 정보 입력</h1>
      </div>
      <form className="signup3-form">
        <TextField
          type="number"
          label="전체 학기 평점"
          value={overallGPA}
          onChange={handleGPAChange(setOverallGPA)}
          fullWidth
          variant="outlined"
          inputProps={{ step: 0.1, max: 4.5 }}
          sx={{ mb: 3 }}
        />
        <TextField
          type="number"
          label="직전 학기 평점"
          value={previousGPA}
          onChange={handleGPAChange(setPreviousGPA)}
          fullWidth
          variant="outlined"
          inputProps={{ step: 0.1, max: 4.5 }}
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>소득 분위</InputLabel>
          <Select value={incomeBracket} onChange={(e) => setIncomeBracket(e.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <MenuItem key={value} value={value}>
                {value}분위
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>거주지</InputLabel>
          <Select
            value={residenceInfo.residence}
            onChange={(e) => setResidenceInfo({ residence: e.target.value, city: '' })}
          >
            {Object.keys(cities).map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {cities[residenceInfo.residence] && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>시/군/구</InputLabel>
            <Select
              value={residenceInfo.city}
              onChange={(e) => setResidenceInfo({ ...residenceInfo, city: e.target.value })}
            >
              {cities[residenceInfo.residence]?.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleNext}
            disabled={isDisabled}
          >
            완료
          </Button>
        </Box>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              margin: 'auto',
            }}
          >
            <Typography variant="h6">{alertMessage}</Typography>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Signup3;
