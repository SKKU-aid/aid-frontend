// src/components/Notices/FavNotices.js

import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const FavNotices = ({userID, scholarships,toggleFavorite }) => {
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
                id={scholarship._id}
                userID={userID}
                title={scholarship.scholarshipName}
                foundation={scholarship.foundation}
                views={scholarship.views}
                tags={scholarship.tags}
                date={scholarship.applicationPeriod}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(userID, true, scholarship._id)}
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
