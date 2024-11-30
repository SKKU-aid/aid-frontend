// src/components/Notices/AllNotices.js

import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const AllNotices = ({ scholarships, userID, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = scholarships && scholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {paginatedData.length > 0 ?(
        paginatedData.map((scholarship) => (
        <ScholarshipCard
          key={scholarship.scholarshipID}
          id={scholarship.scholarshipID}
          userID={userID}
          title={scholarship.scholarshipName}
          foundation={scholarship.foundation}
          views={scholarship.views}
          tags={scholarship.tags}
          date={(scholarship.applicationPeriod && !scholarship.applicationPeriod.includes("Unknown")) ? scholarship.applicationPeriod : '-'}
          isFavorite={scholarship.isFav}
          // isFavorite={scholarship.isFavorite}
          onToggleFavorite={() => toggleFavorite(userID, scholarship.isFav, scholarship.scholarshipID)}
          />
      ))):(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <img
          src="/noResult.png"
          alt="No Favorite Scholarships"
          style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
        />
        <p>장학 공고가 없습니다</p>
      </div>
      )}
      <Pagination
        count={Math.ceil(scholarships.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
};
export default AllNotices;
