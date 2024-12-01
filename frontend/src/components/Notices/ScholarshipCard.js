// src/components/Notices/ScholarshipCard.js

import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const calculateDDay = (period) => {
  if (!period || !period.includes('~')) 
    return '정보 없음';

  const [start, end] = period.split('~');
  if (!end || isNaN(new Date(end).getTime()))
    return '정보 없음';

  const endDate = new Date(end.trim());
  const today = new Date();
  const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `D-${diffDays}` : '마감';
};

const ScholarshipCard = ({ id, userID, scholarshipID, title, foundation, tags, date, views,onToggleFavorite, isFavorite  }) => {
  // const [isFavorite, setIsFavorite] = useState(false);
  const dDay = date  ?  calculateDDay(date) || '-' : '-';
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/notice/${id}`, { state: { id: id, isFav: isFavorite } });
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // IconButton 클릭 시 카드의 클릭 이벤트 전파 방지
    onToggleFavorite(userID, isFavorite, scholarshipID); // 즐겨찾기 상태를 토글
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
            {foundation !== "Unknown Foundation" ? foundation : ''} 조회수: {views}
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
          <IconButton onClick={handleFavoriteClick}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>

      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;
