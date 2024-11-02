import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const ScholarshipCard = ({ id, title, foundation, views, tags, date, isFavorite, onToggleFavorite }) => {
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
        // maxWidth: '1140px', // 최대 너비 설정
        boxSizing: 'border-box',
        padding: '16px',
        boxShadow: 'none',
      }}
      onClick={handleCardClick}
    >
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
        
        {/* 첫 번째 구역: 장학금 이름, 재단 및 조회수 (3 비율) */}
        <div style={{ flex: 3, textAlign: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {foundation} 조회수 {views}
          </Typography>
        </div>

        {/* 두 번째 구역: 태그 (#대학생, #경상남도) (2 비율) */}
        <div style={{ flex: 2, display: 'flex', gap: '8px', textAlign: 'left' }}>
          {tags.map((tag, index) => (
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

        {/* 세 번째 구역: D-4 영역 (4 비율, 오른쪽 정렬) */}
        <div style={{ flex: 4, textAlign: 'right' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>{date.split("(")[0]}</Typography>
          <Typography variant="body2" color="textSecondary">({date.split("(")[1]}</Typography>
        </div>

        {/* 네 번째 구역: 하트 아이콘 (1 비율, 가운데 정렬) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton onClick={onToggleFavorite}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>

      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;
