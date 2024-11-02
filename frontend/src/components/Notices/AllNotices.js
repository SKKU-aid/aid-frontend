// src/components/Notices/AllNotices.js

import React, { useState, useEffect } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Pagination, Container } from '@mui/material';

const AllNotices = ({ userID, toggleFavorite }) => {
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const [scholarshipData, setScholarshipData] = useState([]);
  
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        console.log(`${process.env.PUBLIC_URL}`);
        const response = await fetch(`${process.env.PUBLIC_URL}/data/dummy2.json`);
        const data = await response.json();
        setScholarshipData(data);
        console.log('Local data loaded:', data);
      } catch (error) {
        console.error('Error loading local data:', error);
      }
    };
    fetchLocalData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = scholarshipData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {paginatedData.map((scholarship) => (
        <ScholarshipCard
          userID={userID}
          scholarshipID={scholarship.scholarshipID}
          title={scholarship.scholarshipName}
          foundation={scholarship.scholarshipType}
          id={scholarship.id}
          views={scholarship.views}
          tags={scholarship.eligibleMajors}
          date={scholarship.applicationPeriod}
          isFavorite={scholarship.isFavorite}
          onToggleFavorite={() => toggleFavorite(scholarship.scholarshipID)}
        />
      ))}
      <Pagination
        count={Math.ceil(scholarshipData.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export default AllNotices;
