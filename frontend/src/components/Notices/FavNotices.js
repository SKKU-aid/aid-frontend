// src/components/Notices/FavNotices.js

import React, { useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination } from '@mui/material';

const FavNotices = ({ scholarships, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const favoriteScholarships = scholarships.filter((scholarship) => scholarship.isFavorite);
  const paginatedData = favoriteScholarships.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <h1>관심 장학</h1> */}
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
        count={Math.ceil(favoriteScholarships.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export default FavNotices;
