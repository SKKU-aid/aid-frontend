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
  const [sortOption, setSortOption] = useState('recent');

  const userID = localStorage.getItem('userID'); // 사용자 ID 가져오기
  //const userID = "";
  // 모든 데이터를 다시 가져오는 함수
  const refreshData = async () => {
    console.log(userID);
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

  useEffect(() => {
    refreshData(); // 컴포넌트가 처음 로드될 때 데이터 가져오기
  }, [userID]);

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
    //console.log(userID, isFavorite, schol/arshipID);
    if (!userID) return; // userID가 없으면 아무 작업도 하지 않음
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
    sortOption === 'recent'
      ? new Date(b.applicationPeriod) - new Date(a.applicationPeriod)
      : b.views - a.views
  );

  return (
    <div>
      <Header isLogin={isLogin} />
      <div style={{ width: '100vw', backgroundColor: 'white', overflowX: 'hidden' }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '85%',
            margin: 'auto',
          }}
        >
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
          <AllNotices userID={userID} scholarships={sortedAllScholarships} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 1 && (
          <CustomNotices userID={userID} scholarships={customScholarships} toggleFavorite={toggleFavorite} />
        )}
        {activeTab === 2 && (
          <FavNotices userID={userID} scholarships={favScholarships} toggleFavorite={toggleFavorite} />
        )}
      </div>
    </div>
  );
};

export default Home;
