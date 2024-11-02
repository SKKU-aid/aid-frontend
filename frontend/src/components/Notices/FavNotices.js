// src/components/Notices/FavNotices.js

import React, { useState, useEffect } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const FavNotices = ({ scholarships, userID, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = scholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
        <>
          {paginatedData.length > 0 ? (
            paginatedData.map((scholarship) => (
              <ScholarshipCard
                id={scholarship.scholarshipID}
                userID={userID}
                title={scholarship.scholarshipName}
                foundation={scholarship.scholarshipType}
                views={scholarship.views || 0} 
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
            count={Math.ceil(scholarships.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </>
    </div>
  );
};

export default FavNotices;
