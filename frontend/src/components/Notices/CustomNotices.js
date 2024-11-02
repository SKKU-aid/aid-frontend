// src/components/Notices/CustomNotices.js

import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const CustomNotices = ({ scholarships, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const recommendedScholarships = scholarships.filter((scholarship) => scholarship.isRecommended);
  const paginatedData = recommendedScholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <h1>맞춤형 장학</h1> */}
      {paginatedData.map((scholarship) => (
        <ScholarshipCard
          id={scholarship.id}
          title={scholarship.title}
          foundation={scholarship.foundation}
          views={scholarship.views}
          tags={scholarship.tags}
          date={scholarship.date}
          isFavorite={scholarship.isFavorite}
          onToggleFavorite={() => toggleFavorite(scholarship.id)}
        />
      ))}
      <Pagination
        count={Math.ceil(recommendedScholarships.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export default CustomNotices;