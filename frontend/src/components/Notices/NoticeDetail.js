import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Divider, Container, Chip, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../Common/Header';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../api/favApi';

const NoticeDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const userID = localStorage.getItem('currentUserID');
    const [notice, setNotice] = useState(null);
    const [isFavorite, setIsFavorite] = useState(location.state?.isFav || false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchScholarshipDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/scholarships/${id}`, {
                    params: { userID }
                });

                if (response.data.success) {
                    setNotice(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError(error.response?.data?.message || '장학금 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchScholarshipDetail();
    }, [id]);
    
    if (!notice) {
        return <div>장학금 정보를 찾을 수 없습니다.</div>;
    }

    const renderSubtitle = (title, content) => {
        if (!content || (Array.isArray(content) && content.length === 0)) {
            return null;
        }
    
        return (
            <Typography variant="subtitle1" sx={{ fontWeight: 600, marginTop: '12px' }}>
                <span style={{ fontWeight: 900 }}>{title}</span> : {content}
            </Typography>
        );
    };

    const formatArrayToString = (arr) => {
        if (!arr) return null;
        const dataArray = Array.isArray(arr) ? arr : Array.from(arr);
        return dataArray.length > 0 ? dataArray.join(', ') : null;
    };

    const formatAmount = (amount) => {
        if (!amount) return null;
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleToggleFavorite = (userID, isFavorite, scholarshipID) => {
        if (!userID) return; // userID가 없으면 아무 작업도 하지 않음
        setIsFavorite(!isFavorite);
        
        if (isFavorite) {
          removeFromFavorites(userID, scholarshipID); // 관심 장학 삭제
        } else {
          addToFavorites(userID, scholarshipID); // 관심 장학 추가
        }
    };

    return (
        <div>
            <Header isLogin={true}/>
            <Container sx={{mt: '50px'}}> 
                <Paper elevation={3} sx={{ padding: '25px', margin: '15px 30px', borderRadius: '15px' }}>
                    <Container sx={{ p: 3 }}>
                        <IconButton onClick={() => handleToggleFavorite(userID, isFavorite, id)} sx={{ p: '0', mb: '15px' }}>
                            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {notice?.scholarshipName}
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                            {notice?.eligibleMajors && notice.eligibleMajors.size > 0 && (
                                <div>
                                    {Array.from(notice.eligibleMajors).map((major, index) => (
                                        <Chip
                                            key={index}
                                            sx={{ m: '0px 10px 10px 0px', p: '5px', backgroundColor: '#EDF1D6' }}
                                            label={`#${major}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <Divider sx={{ margin: '15px 0 20px' }} />
                        
                        {renderSubtitle('장학금 유형', notice?.scholarshipType)}
                        {renderSubtitle('신청기간', notice?.applicationPerior)}
                        {renderSubtitle('선발인원', notice?.numberOfRecipients && `${notice.numberOfRecipients}명`)}
                        {renderSubtitle('선발혜택', formatAmount(notice?.scholarshipAmount))}
                        {renderSubtitle('접수방법', notice?.applicationMethod)}
                        {renderSubtitle('지원 가능 학과', formatArrayToString(notice?.eligibleMajors))}
                        { notice?.eligibleSemesters && notice.eligibleSemesters.length > 0 && notice.eligibleSemesters != -1 && (
                            renderSubtitle('지원 가능 학기', formatArrayToString(notice?.eligibleSemesters) + ' 학기')
                        )}
                        {renderSubtitle('나이제한', notice?.ageLimit && `${notice.ageLimit}세 이하`)}
                        {renderSubtitle('지역제한', formatArrayToString(notice?.regionalRestrictions))}
                        {renderSubtitle('소득분위', notice?.incomeLevelLimit && `${notice.incomeLevelLimit}분위 이하`)}
                        {renderSubtitle('특이사항', notice?.significant)}
                        {renderSubtitle('링크', notice?.link && (
                            <a 
                                href={notice.link.startsWith('http') ? notice.link : `http://${notice.link}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: 'green', fontWeight: 'bold' }}
                            >
                                🚀 원본 링크로 이동하기 🚀 
                            </a>
                        ))}
                    </Container>
                </Paper>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: '40px', fontSize: '1rem', fontWeight: 600, margin: '15px', borderRadius: '10px' }}
                    onClick={() => navigate('/')}
                >
                    목록으로 돌아가기
                </Button>
            </Container>
        </div>
    );
};

export default NoticeDetail;
