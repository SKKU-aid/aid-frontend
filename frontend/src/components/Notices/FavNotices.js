// src/components/Notices/FavNotices.js

import React, { useState, useEffect } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const FavNotices = ({ userID, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const [favoriteScholarships, setFavoriteScholarships] = useState([]);

  useEffect(() => {
    const fetchFavoriteScholarships = async () => {
      try {
        // 주석 처리된 API 호출 예시
        /*
        const response = await fetch(`/users/${userID}/scholarships`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: Number(userID) }),
        });
        const data = await response.json();
        if (data.success) {
          setFavoriteScholarships(data.data);
        }
        */

        // 로컬 JSON 파일로부터 관심 장학 불러오기
        const response = await fetch(`${process.env.PUBLIC_URL}/data/user_dummy.json`);
        const usersData = await response.json();
        const user = usersData.find((user) => user.userID === userID);
        if (user) {
          setFavoriteScholarships(user.scholarship);
        } else {
          console.log("User not found in user_dummy.json");
        }
      } catch (error) {
        console.error("Error loading favorite scholarships:", error);
      }
    };

    if (userID) {
      fetchFavoriteScholarships();
    }
  }, [userID]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = favoriteScholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {userID ? (
        <>
          {paginatedData.length > 0 ? (
            paginatedData.map((scholarship) => (
              <ScholarshipCard
                id={scholarship.id}
                userID={userID}
                scholarshipID={scholarship.scholarshipID}
                title={scholarship.scholarshipName}
                foundation={scholarship.scholarshipType}
                views={scholarship.views || 0} // views 데이터가 없을 경우 기본값
                tags={scholarship.eligibleMajors}
                date={scholarship.applicationPeriod}
                isFavorite={scholarship.isFavorite}
                onToggleFavorite={() => toggleFavorite(scholarship.scholarshipID)}
              />
            ))
          ) : (
            <p>관심 장학이 없습니다.</p>
          )}
          <Pagination
            count={Math.ceil(favoriteScholarships.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </>
      ) : (
        <p>로그인이 필요합니다</p>
      )}
    </div>
  );
};

export default FavNotices;
