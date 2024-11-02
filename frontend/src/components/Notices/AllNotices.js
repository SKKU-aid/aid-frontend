// src/components/Notices/AllNotices.js

import React, { useState, useEffect } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination, Container } from '@mui/material';

const AllNotices = ({ scholarships, userID, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = scholarships && scholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  console.log(scholarships)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {paginatedData.map((scholarship) => (
        <ScholarshipCard
          id={scholarship.scholarshipID}
          userID={userID}
          title={scholarship.scholarshipName}
          foundation={scholarship.scholarshipType}
          views={scholarship.views}
          tags={scholarship.eligibleMajors}
          date={scholarship.applicationPeriod}
          isFavorite={scholarship.isFavorite}
          onToggleFavorite={() => toggleFavorite(scholarship.scholarshipID)}
        />
      ))}
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
