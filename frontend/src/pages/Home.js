import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import Header from '../components/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import scholarshipsData from '../data/dummydata.json'; // JSON 파일을 불러옵니다


const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [scholarships, setScholarships] = useState([]);
  const userID = localStorage.getItem('userID'); // 로컬 스토리지에서 userID를 가져옴

  useEffect(() => {
    // scholarships.json에서 데이터를 로드하여 초기화
    setScholarships(scholarshipsData);
    // scholarships을 localStorage에 저장
    // localStorage.setItem('scholarships', JSON.stringify(scholarshipsData));
  }, []);

  // 관심 장학 여부를 토글하는 함수
  const toggleFavorite = (id) => {
    setScholarships((prevScholarships) =>
      prevScholarships.map((scholarship) =>
        scholarship.id === id
          ? { ...scholarship, isFavorite: !scholarship.isFavorite }
          : scholarship
      )
    );
  };

  const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
  };
  
  return (
    <div>
      <Header isLogin={isLogin}/>
      <div style={{ width: '100vw',  backgroundColor: 'white', overflowX: 'hidden', borderBottom: '1px solid #CDD0DC'}}>
        {/* <div>USER ID {userID}</div> */}
        <Container sx={{m: '0 86px'}}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="green" 
            textColor="inherit" 
          >
            <Tab label="모든 장학" sx={tabStyle(activeTab === 0)} />
            <Tab label="맞춤형 장학" sx={tabStyle(activeTab === 1)} />
            <Tab label="관심 장학" sx={tabStyle(activeTab === 2)} />
          </Tabs>
        </Container>
      </div>
      <div style={{ padding: '30px 120px 50px', backgroundColor: '#white' }}>
        {activeTab === 0 && <AllNotices userID={userID} scholarships={scholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 1 && <CustomNotices userID={userID} scholarships={scholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 2 && <FavNotices userID={userID} scholarships={scholarships} toggleFavorite={toggleFavorite} />}
      </div>
    </div>
  );
};

const tabStyle = (isActive) => ({
  color: isActive ? '#4D755B' : 'black',
  fontWeight: isActive ? 600 : 600,
  fontSize: '16px',
  padding: '18px 10px',
  borderBottom: isActive ? '2px solid #4D755B' : 'none',
});

export default Home;