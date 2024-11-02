import React, { useState, useEffect } from 'react';
import { Container, Divider, Tab, Tabs, TextField } from '@mui/material';
import Header from '../components/Common/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import scholarshipsData from '../data/dummydata.json';
import SearchField from '../components/Common/SearchField';

const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [scholarships, setScholarships] = useState([]);
  
  // 탭별 검색어 상태 추가
  const [allSearchQuery, setAllSearchQuery] = useState('');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [favSearchQuery, setFavSearchQuery] = useState('');

  useEffect(() => {
    setScholarships(scholarshipsData);
  }, []);

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

  // 각 탭별 검색어 변경 함수
  const handleAllSearchChange = (event) => setAllSearchQuery(event.target.value);
  const handleCustomSearchChange = (event) => setCustomSearchQuery(event.target.value);
  const handleFavSearchChange = (event) => setFavSearchQuery(event.target.value);

  // 각 탭별 검색어 필터링
  const filteredAllScholarships = scholarships.filter((scholarship) =>
    scholarship.title.toLowerCase().includes(allSearchQuery.toLowerCase()) ||
    scholarship.foundation.toLowerCase().includes(allSearchQuery.toLowerCase())
  );

  const filteredCustomScholarships = scholarships.filter((scholarship) =>
    scholarship.title.toLowerCase().includes(customSearchQuery.toLowerCase()) ||
    scholarship.foundation.toLowerCase().includes(customSearchQuery.toLowerCase())
  );

  const filteredFavScholarships = scholarships
    .filter((scholarship) => scholarship.isFavorite)
    .filter((scholarship) =>
      scholarship.title.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
      scholarship.foundation.toLowerCase().includes(favSearchQuery.toLowerCase())
    );

  return (
    <div>
      <Header isLogin={isLogin} />
      <div style={{ width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '85%', margin: 'auto' }}>
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

          <Divider sx={{ width: '100%' }} />
          
          <div style={{ display: 'flex', marginTop: '20px' }}>
            {activeTab === 0 && (
              <SearchField
                placeholder="모든 장학 검색"
                value={allSearchQuery}
                onChange={handleAllSearchChange}
              />
            )}
            {activeTab === 1 && (
              <SearchField
                placeholder="맞춤형 장학 검색"
                value={customSearchQuery}
                onChange={handleCustomSearchChange}
              />
            )}
            {activeTab === 2 && (
              <SearchField
                placeholder="관심 장학 검색"
                value={favSearchQuery}
                onChange={handleFavSearchChange}
              />
            )}
          </div>
        </Container>
      </div>

      <div style={{ padding: '30px 120px 50px', backgroundColor: 'white' }}>
        {activeTab === 0 && <AllNotices scholarships={filteredAllScholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 1 && <CustomNotices scholarships={filteredCustomScholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 2 && <FavNotices scholarships={filteredFavScholarships} toggleFavorite={toggleFavorite} />}
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
