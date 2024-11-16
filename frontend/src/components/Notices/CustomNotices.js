// src/components/Notices/CustomNotices.js

import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const CustomNotices = ({ userID, scholarships, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  // const recommendedScholarships = scholarships.filter((scholarship) => scholarship.isRecommended);
  const paginatedData = scholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {paginatedData.length > 0 ? (
        paginatedData.map((scholarship) => (
        <ScholarshipCard
          id={scholarship.scholarshipID}
          userID={userID}
          title={scholarship.scholarshipName}
          foundation={scholarship.foundation}
          views={scholarship.views}
          tags={scholarship.tags}
          date={scholarship.applicationPeriod}
          isFavorite={scholarship.isFav}
          onToggleFavorite={() => toggleFavorite(userID, scholarship.isFav, scholarship.scholarshipID)}
          />
      ))):(
        <img
        src="/noResult.png"
        alt="No Results"
        style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
      />
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

export default CustomNotices;
