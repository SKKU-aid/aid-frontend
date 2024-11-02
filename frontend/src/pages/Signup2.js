import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup2.css';
import { Autocomplete, TextField } from '@mui/material';

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

  const handleNext = () => {
    // 다음 단계로 진행하는 로직 추가
    navigate('/signup3');
  };

  return (
    <div className="signup2-container">
      <div className="signup2-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup2-logo" />
        <h1 id="signup2-title">기본 정보 입력</h1>
      </div>
      <div className="signup2-form">
        <div className="gender-birth-container">
          <div className="gender-container">
            <label>성별</label>
            <div className="gender-options">
              <button
                className={gender === '남' ? 'gender-button active' : 'gender-button'}
                onClick={() => setGender('남')}
              >
                남
              </button>
              <button
                className={gender === '여' ? 'gender-button active' : 'gender-button'}
                onClick={() => setGender('여')}
              >
                여
              </button>
            </div>
          </div>
          <div className="birth-container">
            <label htmlFor="birthDate">생년월일</label>
            <input
              type="text"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="생년월일"
            />
          </div>
        </div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <label htmlFor="major">전공</label>
        <Autocomplete
          id="major"
          options={majorOptions}
          value={major}
          onChange={(event, newValue) => setMajor(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="전공 선택" variant="outlined" />
          )}
        />
        <div className="semester-status-container">
          <div className="semester-container">
            <label htmlFor="currentSemester">현재 학기</label>
            <input
              type="text"
              id="currentSemester"
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
              placeholder="현재 학기"
            />
          </div>
          <div className="status-container">
            <label htmlFor="academicStatus">학적 상태</label>
            <input
              type="text"
              id="academicStatus"
              value={academicStatus}
              onChange={(e) => setAcademicStatus(e.target.value)}
              placeholder="학적 상태"
            />
          </div>
        </div>
        <button onClick={handleNext} className="signup2-button">다음</button>
      </div>
    </div>
  );
};

export default Signup2;
