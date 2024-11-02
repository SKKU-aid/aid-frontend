// src/components/Notices/ScholarshipCard.js

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const fs = window.require ? window.require('fs') : null;
const path = window.require ? window.require('path') : null;

const calculateDDay = (period) => {
  const [start, end] = period.split('~');
  const endDate = new Date(end.trim());
  const today = new Date();
  const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `D-${diffDays}` : '마감';
};

const ScholarshipCard = ({ id, userID, scholarshipID, title, foundation, tags, date }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dDay = date ?  calculateDDay(date) || '-' : '-';

  // useEffect(() => {
  //   // 관심 장학 여부를 user_dummy.json에서 확인
  //   const fetchFavoriteStatus = () => {
  //     if (fs && path) {
  //       try {
  //         const dataPath = path.join(__dirname, '../../data/user_dummy.json');
  //         const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  //         const userData = data.find((user) => user.userID === userID);
  //         if (userData) {
  //           const isFavoriteScholarship = userData.scholarship.some((s) => s.scholarshipID === scholarshipID);
  //           setIsFavorite(isFavoriteScholarship);
  //         }
  //       } catch (error) {
  //         console.error('Failed to read user_dummy.json:', error);
  //       }
  //     }
  //   };

  //   fetchFavoriteStatus();
  // }, [userID, scholarshipID]);

  // const handleToggleFavorite = () => {
  //   if (!userID) {
  //     alert("로그인이 필요합니다.");
  //     return;
  //   }

  //   if (fs && path) {
  //     try {
  //       const dataPath = path.join(__dirname, '../../data/user_dummy.json');
  //       const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  //       const userIndex = data.findIndex((user) => user.userID === userID);

  //       if (userIndex !== -1) {
  //         const userData = data[userIndex];
  //         const scholarshipIndex = userData.scholarship.findIndex((s) => s.scholarshipID === scholarshipID);

  //         if (scholarshipIndex !== -1) {
  //           // 관심 장학에서 삭제
  //           userData.scholarship.splice(scholarshipIndex, 1);
  //           setIsFavorite(false);
  //           console.log(`장학금 ID ${scholarshipID}가 관심 목록에서 삭제되었습니다.`);
  //         } else {
  //           // 관심 장학에 추가
  //           userData.scholarship.push({
  //             scholarshipID,
  //             scholarshipName: title,
  //           });
  //           setIsFavorite(true);
  //           console.log(`장학금 ID ${scholarshipID}가 관심 목록에 추가되었습니다.`);
  //         }

  //         // 업데이트된 데이터를 user_dummy.json에 다시 쓰기
  //         fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  //       } else {
  //         console.error("User not found in user_dummy.json");
  //       }
  //     } catch (error) {
  //       console.error('Failed to write to user_dummy.json:', error);
  //     }
  //   }
  // };

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/notice/${id}`);
  };

  return (
    <Card
      style={{
        marginBottom: '16px',
        cursor: 'pointer',
        backgroundColor: '#FAFAFA',
        borderRadius: '12px',
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        boxShadow: 'none',
      }}
      onClick={handleCardClick}
    >
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
        
        {/* 첫 번째 구역: 장학금 이름, 유형 (Type) */}
        <div style={{ flex: 3, textAlign: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {foundation}
          </Typography>
        </div>

        {/* 두 번째 구역: 태그 (Major) */}
        <div style={{ flex: 2, display: 'flex', gap: '8px', textAlign: 'left' }}>
          {tags && tags.map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              style={{
                backgroundColor: '#F5F5F5',
                fontWeight: '500',
                fontSize: '0.8rem',
              }}
            />
          ))}
        </div>

        {/* 세 번째 구역: D-Day와 기간 */}
        <div style={{ flex: 4, textAlign: 'right' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>{dDay}</Typography>
          <Typography variant="body2" color="textSecondary">{date}</Typography>
        </div>

        {/* 네 번째 구역: 하트 아이콘 */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton onClick={() => console.log("FAV Click!")}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>

      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;
