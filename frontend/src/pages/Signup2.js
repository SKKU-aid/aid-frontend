import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup2.css';

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
        <select
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="major-dropdown"
        >
          <option value="" disabled>전공 선택</option>
          <option value="경영학과">경영학과</option>
          <option value="경제학과">경제학과</option>
          <option value="글로벌경제학과">글로벌경제학과</option>
          <option value="행정학과">행정학과</option>
          <option value="통계학과">통계학과</option>
          <option value="한문학과">한문학과</option>
        </select>
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
