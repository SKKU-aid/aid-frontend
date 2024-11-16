import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const CustomNotices = ({ userID, scholarships, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 페이지네이션 처리
  const paginatedData = scholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 1. userID가 없는 경우 */}
      {!userID ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img
            src="/profileMale.jpeg"
            alt="Login Required"
            style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
          />
          <p>로그인이 필요합니다</p>
        </div>
      ) : paginatedData.length > 0 ? (
        // 2. 추천 장학 데이터가 있을 경우
        paginatedData.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.scholarshipID}
            id={scholarship.scholarshipID}
            userID={userID}
            title={scholarship.scholarshipName}
            foundation={scholarship.foundation}
            views={scholarship.views}
            tags={scholarship.tags}
            date={scholarship.applicationPeriod}
            isFavorite={scholarship.isFav}
            onToggleFavorite={() =>
              toggleFavorite(userID, scholarship.isFav, scholarship.scholarshipID)
            }
          />
        ))
      ) : (
        // 3. 추천 장학 데이터가 없는 경우
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img
            src="/noResult.png"
            alt="No Results"
            style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
          />
          <p>추천 장학금이 없습니다</p>
        </div>
      )}
      {/* 페이지네이션 */}
      {scholarships.length > 0 && userID && (
        <Pagination
          count={Math.ceil(scholarships.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default CustomNotices;
