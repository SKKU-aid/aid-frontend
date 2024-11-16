import React, { useState, useEffect } from 'react';
import { Container, Divider, Tab, Tabs } from '@mui/material';
import Header from '../components/Common/Header';
import AllNotices from '../components/Notices/AllNotices';
import CustomNotices from '../components/Notices/CustomNotices';
import FavNotices from '../components/Notices/FavNotices';
import axios from 'axios'; // Axios로 API 호출

const Home = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [allScholarships, setAllScholarships] = useState([]);
  const [customScholarships, setCustomScholarships] = useState([]);
  const [favScholarships, setFavScholarships] = useState([]);
  const [allSearchQuery, setAllSearchQuery] = useState('');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [favSearchQuery, setFavSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const userID = localStorage.getItem('userID'); // 사용자 ID 가져오기

  // 모든 데이터를 다시 가져오는 함수
  const refreshData = async () => {
    try {
      const allResponse = await axios.get(`http://localhost:8082/scholarships?userID=${userID}`);
      if (allResponse.data.success) {
        setAllScholarships(allResponse.data.data);
      }

      const customResponse = await axios.get(`http://localhost:8082/users/${userID}/scholarships?type=custom`);
      if (customResponse.data.success) {
        setCustomScholarships(customResponse.data.data);
      }

      const favResponse = await axios.get(`http://localhost:8082/users/${userID}/fav-scholarships`);
      if (favResponse.data.success) {
        setFavScholarships(favResponse.data.data);
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  useEffect(() => {
    refreshData(); // 처음 로드 시 모든 데이터를 가져옴
  }, [userID]);

  // 관심 장학 추가 함수
  const addToFavorites = async (scholarshipID) => {
    try {
      const response = await axios.post(`http://localhost:8082/users/${userID}/fav-scholarships`, {
        userID,
        scholarshipID,
      });
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
    try {
      const response = await axios.delete(`http://localhost:8082/users/${userID}/fav-scholarships`, {
        data: { userID, scholarshipID },
      });
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
    console.log('isFavorite:', isFavorite);
    console.log('scholarshipID:', scholarshipID);
    if (isFavorite) {
      removeFromFavorites(scholarshipID); // 관심 장학 삭제
    } else {
      addToFavorites(scholarshipID); // 관심 장학 추가
    }
  };

  // 검색 및 정렬 처리
  const filteredAllScholarships = allScholarships.filter((scholarship) =>
    scholarship.scholarshipName.toLowerCase().includes(allSearchQuery.toLowerCase())
  );
  const sortedAllScholarships = filteredAllScholarships.sort((a, b) =>
    sortOption === 'recent' ? new Date(b.applicationPeriod) - new Date(a.applicationPeriod) : b.views - a.views
  );

  return (
    <div>
      <Header isLogin={isLogin} />
      <div style={{ width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '85%', margin: 'auto' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="모든 장학" />
            <Tab label="맞춤형 장학" />
            <Tab label="관심 장학" />
          </Tabs>
          <Divider sx={{ width: '100%' }} />
        </Container>
      </div>
      <div style={{ padding: '30px', backgroundColor: 'white' }}>
        {activeTab === 0 && (
          <AllNotices scholarships={sortedAllScholarships} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 1 && <CustomNotices scholarships={customScholarships} toggleFavorite={toggleFavorite} />}
        {activeTab === 2 && <FavNotices scholarships={favScholarships} toggleFavorite={toggleFavorite} />}
      </div>
    </div>
  );
};

export default Home;
