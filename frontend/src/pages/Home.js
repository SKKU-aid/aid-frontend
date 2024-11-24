import React, { useState, useEffect } from 'react';
import { Container, Divider, Tab, Tabs } from '@mui/material';
import Header from '../components/Common/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import axios from 'axios'; 
import SearchField from '../components/Common/SearchField';
import Filter from '../components/Common/Filter';

const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);

  const [allScholarships, setAllScholarships] = useState([]);
  const [customScholarships, setCustomScholarships] = useState([]);
  const [favScholarships, setFavScholarships] = useState([]);

  const [allSearchQuery, setAllSearchQuery] = useState('');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [favSearchQuery, setFavSearchQuery] = useState('');

  const [sortOption, setSortOption] = useState('recent');
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUserID');
    setUserID(user);
  }, []);

  const refreshData = async () => {
    try {
      // 모든 장학 데이터
      const allResponse = await axios.get(
        userID
          ? `http://localhost:8082/scholarships?userID=${userID}`
          : `http://localhost:8082/scholarships`
      );
      if (allResponse.data.success) {
        setAllScholarships(allResponse.data.data);
      }

      // 추천 장학 데이터 (userID가 있을 때만 호출)
      if (userID) {
        const customResponse = await axios.get(
          `http://localhost:8082/users/${userID}/scholarships?type=custom`
        );
        if (customResponse.data.success) {
          setCustomScholarships(customResponse.data.data);
        }
      } else {
        setCustomScholarships([]); // userID가 없으면 빈 리스트로 초기화
      }

      // 관심 장학 데이터 (userID가 있을 때만 호출)
      if (userID) {
        const favResponse = await axios.get(
          `http://localhost:8082/users/${userID}/fav-scholarships`
        );
        console.log('관심 장학 데이터:', favResponse.data);
        if (favResponse.data.success) {
          setFavScholarships(favResponse.data.data);
        }
      } else {
        setFavScholarships([]); // userID가 없으면 빈 리스트로 초기화
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  // 관심 장학 추가 함수
  const addToFavorites = async (scholarshipID) => {
    if (!userID) return; // userID가 없으면 아무 작업도 하지 않음

    try {
      const response = await axios.post(
        `http://localhost:8082/users/${userID}/fav-scholarships`,
        { userID, scholarshipID }
      );
      if (response.data.success) {
        console.log('관심 장학 추가 성공:', response.data.message);
        await refreshData(); // 성공 후 데이터 새로고침
      } else {
        console.error('Failed to add to favorites:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // 관심 장학 삭제 함수
  const removeFromFavorites = async (scholarshipID) => {
    if (!userID) return; // userID가 없으면 아무 작업도 하지 않음

    try {
      const response = await axios.delete(
        `http://localhost:8082/users/${userID}/fav-scholarships`,
        { data: { userID, scholarshipID } }
      );
      if (response.data.success) {
        console.log('관심 장학 삭제 성공:', response.data.message);
        await refreshData(); // 성공 후 데이터 새로고침
      } else {
        console.error('Failed to remove from favorites:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // 관심 상태 토글 함수
  const toggleFavorite = (userID, isFavorite, scholarshipID) => {
    if (!userID) return; // userID가 없으면 아무 작업도 하지 않음
    if (isFavorite) {
      removeFromFavorites(scholarshipID); // 관심 장학 삭제
    } else {
      addToFavorites(scholarshipID); // 관심 장학 추가
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

   const handleAllSearchChange = (event) => setAllSearchQuery(event.target.value);
   const handleCustomSearchChange = (event) => setCustomSearchQuery(event.target.value);
   const handleFavSearchChange = (event) => setFavSearchQuery(event.target.value);
 
   const filteredAllScholarships = allScholarships.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(allSearchQuery.toLowerCase()) ||
    scholarship.foundation.toLowerCase().includes(allSearchQuery.toLowerCase())
  ) || [];
  
  const filteredCustomScholarships = customScholarships.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(customSearchQuery.toLowerCase()) ||
    scholarship.foundation.toLowerCase().includes(customSearchQuery.toLowerCase())
  ) || [];
  
  const filteredFavScholarships = favScholarships
    .filter((scholarship) =>
      scholarship.scholarshipName.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
      scholarship.foundation.toLowerCase().includes(favSearchQuery.toLowerCase())
    ) || [];

    const sortScholarships = (scholarshipsToSort) => {
      switch (sortOption) {
        case 'recent':
          return scholarshipsToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'deadline':
          return scholarshipsToSort.sort((a, b) => {
            const dateA = a.applicationPeriod.match(/\d{1,2}\.\d{1,2}/g);
            const dateB = b.applicationPeriod.match(/\d{1,2}\.\d{1,2}/g);
            return dateA && dateB ? new Date(dateA[0]) - new Date(dateB[0]) : 0;
          });
        case 'views':
          return scholarshipsToSort.sort((a, b) => b.views - a.views);
        default:
          return scholarshipsToSort;
      }
    };
  
    const sortedAllScholarships = sortScholarships([...filteredAllScholarships]);
    const sortedCustomScholarships = sortScholarships([...filteredCustomScholarships]);
    const sortedFavScholarships = sortScholarships([...filteredFavScholarships]);  


    useEffect(() => {
      refreshData(); 
    }, [isLogin, activeTab]);

  return (
    <div>
      <Header isLogin={isLogin} />
      <div style={{ width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '80%',
            margin: 'auto',
          }}
        >
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="모든 장학" />
            <Tab label="맞춤형 장학" />
            <Tab label="관심 장학" />
          </Tabs>

          <Divider sx={{ width: '100%' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
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
            <Filter sortOption={sortOption} onSortChange={handleSortChange} />
          </div>
        </Container>
      </div>
      <div style={{ padding: '30px', backgroundColor: 'white', width: '80%', margin: 'auto' }}>
        {activeTab === 0 && (
          <AllNotices userID={userID} scholarships={sortedAllScholarships} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 1 && (
          <CustomNotices userID={userID} scholarships={sortedCustomScholarships} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 2 && (
          <FavNotices userID={userID} scholarships={sortedFavScholarships} toggleFavorite={toggleFavorite} />
        )}
      </div>
    </div>
  );
};

export default Home;
