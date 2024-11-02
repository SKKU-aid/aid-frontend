import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Container, Chip, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import scholarshipsDetailData from '../../data/dummyDetailData.json';
import Header from '../Common/Header';
import { useNavigate } from 'react-router-dom';

const NoticeDetail = ({ notices }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    
    useEffect(() => {
        const noticeFromNotices = notices?.find((item) => item.id === parseInt(id));
        const noticeFromDummyData = scholarshipsDetailData.find((item) => item.scholarshipID === parseInt(id));
        setNotice(noticeFromNotices || noticeFromDummyData);
    }, [id, notices]);
    
    if (!notice) {
        return <div>장학금 정보를 찾을 수 없습니다.</div>;
    }

    let currentNumber = 1;

    const renderSubtitle = (title, content) => (
        (content !== null && content !== "") && (
        <Typography variant="subtitle1" sx={{ fontWeight: 600, marginTop: '12px' }}>
            <span style={{ fontWeight: 900 }}>{currentNumber++}. {title}</span> : {content}
        </Typography>
        )
    );

    return (
        <div>
            <Header isLogin={true}/>
            <Container sx={{backgroundColor: 'red'}}> 
                <Paper elevation={3} sx={{ padding: '25px', margin: '15px 30px', borderRadius: '15px' }}>
                    <Container sx={{ p: 3 }}>
                        <IconButton sx={{ p: '0', mb: '5px' }}>
                        <FavoriteIcon />
                        </IconButton>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{notice.scholarshipName || notice.title}</Typography>
                        {notice.daysLeft !== undefined ? (
                            notice.daysLeft >= 0 ? (
                            <Chip
                                label={notice.daysLeft === 0 ? 'D-day' : `D-${notice.daysLeft}`}
                                style={{
                                backgroundColor: notice.daysLeft === 0 ? '#FF6D60' : '#609966',
                                color: 'white',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                margin: '10px 0 0',
                                }}
                            />
                            ) : (
                            <Chip
                                label="모집 완료"
                                style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '10px', fontWeight: 'bold', margin: '10px 0 0' }}
                            />
                            )
                        ) : null}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                        <div>
                            {notice.keywords &&
                            notice.keywords.map((keyword, index) => (
                                <Chip
                                key={index}
                                sx={{ m: '0px 10px 10px 0px', p: '5px', backgroundColor: '#EDF1D6' }}
                                label={`#${keyword}`}
                                />
                            ))}
                        </div>
                        </div>
                        <Divider sx={{ margin: '15px 0 20px' }} />
                        {renderSubtitle('신청기간', notice.applicationPeriod || notice.applyEndAt)}
                        {renderSubtitle('선발인원', notice.numberOfRecipients || notice.numSelection)}
                        {renderSubtitle('선발혜택', notice.scholarshipAmount || notice.benefit)}
                        {renderSubtitle('접수방법', notice.applicationMethod || notice.applyMethod)}
                        {renderSubtitle('지원대상', notice.eligibleMajors ? notice.eligibleMajors.join(', ') : notice.target)}
                        {renderSubtitle('문의', notice.inquiry)}
                        {renderSubtitle('링크', notice.link ? (
                        <a href={notice.link} target="_blank" rel="noopener noreferrer" style={{ color: 'green', fontWeight: 'bold' }}>
                            🚀 원본 링크로 이동하기 🚀 
                        </a>
                        ) : null)}
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
