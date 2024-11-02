import React, { useState, useEffect } from 'react';
import { Container, Divider, Tab, Tabs, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../components/Common/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import scholarshipsData from '../data/dummydata.json';
import SearchField from '../components/Common/SearchField';
import Filter from '../components/Common/Filter';

const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [scholarships, setScholarships] = useState([]);
  const userID = localStorage.getItem('userID'); // 로컬 스토리지에서 userID를 가져옴
  
  const [allSearchQuery, setAllSearchQuery] = useState('');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [favSearchQuery, setFavSearchQuery] = useState('');

  const [sortOption, setSortOption] = useState('recent'); 

  useEffect(() => {
    setScholarships(scholarshipsData);
    // scholarships을 localStorage에 저장
    // localStorage.setItem('scholarships', JSON.stringify(scholarshipsData));
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

  const handleAllSearchChange = (event) => setAllSearchQuery(event.target.value);
  const handleCustomSearchChange = (event) => setCustomSearchQuery(event.target.value);
  const handleFavSearchChange = (event) => setFavSearchQuery(event.target.value);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredAllScholarships = scholarships.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(allSearchQuery.toLowerCase()) 
  );

  const filteredCustomScholarships = scholarships.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(customSearchQuery.toLowerCase()) 
  );

  const filteredFavScholarships = scholarships
    .filter((scholarship) => scholarship.isFavorite)
    .filter((scholarship) =>
      scholarship.scholarshipName.toLowerCase().includes(favSearchQuery.toLowerCase()) 
    );

  // !! 필터 정렬 함수 (데이터 값에 따라 수정 필요)
  const sortScholarships = (scholarshipsToSort) => {
    switch (sortOption) {
      case 'recent':
        // Assuming 'applicationPeriod' contains the start date, sorting by the earliest application start date
        return scholarshipsToSort.sort((a, b) => {
          const dateA = new Date(a.applicationPeriod.split('~')[0]);
          const dateB = new Date(b.applicationPeriod.split('~')[0]);
          return dateA - dateB;
        });
      case 'deadline':
        // Sort by the end date of the application period
        return scholarshipsToSort.sort((a, b) => {
          const dateA = new Date(a.applicationPeriod.split('~')[1]);
          const dateB = new Date(b.applicationPeriod.split('~')[1]);
          return dateA - dateB;
        });
      case 'views':
        // If you have a 'views' property in your data, otherwise remove this case
        return scholarshipsToSort.sort((a, b) => b.views - a.views);
      default:
        return scholarshipsToSort;
    }
  };  

  const sortedAllScholarships = sortScholarships([...filteredAllScholarships]);
  const sortedCustomScholarships = sortScholarships([...filteredCustomScholarships]);
  const sortedFavScholarships = sortScholarships([...filteredFavScholarships]);

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

          <div style={{ width: '100%', display: 'flex', marginTop: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <Filter sortOption={sortOption} onSortChange={handleSortChange} />
          </div>
        </Container>
      </div>

      <div style={{ padding: '30px 120px 50px', backgroundColor: 'white' }}>
        {activeTab === 0 && <AllNotices scholarships={sortedAllScholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 1 && <CustomNotices scholarships={sortedCustomScholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 2 && <FavNotices scholarships={sortedFavScholarships} toggleFavorite={toggleFavorite} />}
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
