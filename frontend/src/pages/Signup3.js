import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup3.css';

const Signup3 = () => {
  const [overallGPA, setOverallGPA] = useState('');
  const [previousGPA, setPreviousGPA] = useState('');
  const [incomeBracket, setIncomeBracket] = useState('');
  const [residence, setResidence] = useState('');

  const navigate = useNavigate();

  const handleNext = () => {
    // 다음 단계로 진행하는 로직 추가
    navigate('/signup4');
  };

  return (
    <div className="signup3-container">
      <div className="signup3-header">
        <img src="/logo.png" alt="SKKU 장학비서" className="signup3-logo" />
        <h1 id="signup3-title">추가 정보 입력</h1>
      </div>
      <div className="signup3-form">
        <label htmlFor="overallGPA">전체 학기 평점</label>
        <input
          type="text"
          id="overallGPA"
          value={overallGPA}
          onChange={(e) => setOverallGPA(e.target.value)}
          placeholder="전체 학기 평점"
        />
        <label htmlFor="previousGPA">직전 학기 평점</label>
        <input
          type="text"
          id="previousGPA"
          value={previousGPA}
          onChange={(e) => setPreviousGPA(e.target.value)}
          placeholder="직전 학기 평점"
        />
        <label htmlFor="incomeBracket">소득분위</label>
        <input
          type="text"
          id="incomeBracket"
          value={incomeBracket}
          onChange={(e) => setIncomeBracket(e.target.value)}
          placeholder="소득분위"
        />
        <label htmlFor="residence">거주지</label>
        <input
          type="text"
          id="residence"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
          placeholder="거주지"
        />
        <button onClick={handleNext} className="signup3-button">다음</button>
      </div>
    </div>
  );
};

export default Signup3;
