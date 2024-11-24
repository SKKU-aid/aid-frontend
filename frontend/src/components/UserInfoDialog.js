import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, List, ListItem, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, Autocomplete, Typography, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const cities = {
    서울: [
      '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구',
      '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구',
    ],
    경기: [
      '가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시',
      '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주군', '연천군', '오산시', '용인시', '의왕시', '의정부시',
    ],
    강원: [
      '강릉시', '동해시', '속초시', '원주시', '춘천시', '태백시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군',
    ],
    충청: [
      '천안시', '청주시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '연기군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군',
    ],
    전라: [
      '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군',
    ],
    경상: [
      '통영시', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군',
    ],
    광주: ['동구', '서구', '남구', '북구', '광산구'],
    대구: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    대전: ['동구', '중구', '서구', '유성구', '대덕구'],
    부산: [
      '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군',
    ],
    울산: ['중구', '남구', '동구', '북구', '울주군'],
    인천: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    제주: ['제주시', '서귀포시'],
    세종: ['세종시'],
  };
  
const UserInfoDialog = ({ open, onClose, userInfo: initialUserInfo, setUserInfo: setParentUserInfo, userName }) => {
    const [editMode, setEditMode] = useState(false);
    const [userInfo, setLocalUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [residenceInfo, setResidenceInfo] = useState({ residence: '', city: '' });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userID = localStorage.getItem('currentUserID');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userID}`);
                
                if (response.data.success) {
                    const userData = response.data.data;
                    setLocalUserInfo(userData);
                    setParentUserInfo(userData);
                    
                    if (userData.region) {
                        const [residence, city] = userData.region.split(' ');
                        setResidenceInfo({ 
                            residence: residence || '', 
                            city: city || '' 
                        });
                    }
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('사용자 정보를 불러오는데 실패했습니다.');
            }
        };

        if (open) {
            fetchUserInfo();
        }
    }, [open, setParentUserInfo]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/users/${userInfo.userID}/update-info`,
                {
                    userID: userInfo.userID,
                    sex: userInfo.sex,
                    birthday: userInfo.birthday,
                    major: userInfo.major,
                    currentSemester: userInfo.currentSemester,
                    currentStatus: userInfo.currentStatus,
                    totalGPA: userInfo.totalGPA,
                    lastGPA: userInfo.lastGPA,
                    incomeLevel: userInfo.incomeLevel,
                    region: `${residenceInfo.residence} ${residenceInfo.city}`
                }
            );

            if (response.data.success) {
                setLocalUserInfo(response.data.data);
                setParentUserInfo(response.data.data);
                setEditMode(false);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('회원정보 수정에 실패했습니다.');
        }
    };

    if (!userInfo) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <List sx={{ width: '330px', p: 2 }}>
                <div>
                    <Typography variant="h4" sx={{fontWeight: 800, textAlign: 'center', pt: 3}}>👻</Typography>
                    <Typography sx={{fontWeight: 800, textAlign: 'center', fontSize: '24px', pb: 1}}>{userName}</Typography>
                    {error && (
                        <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {editMode ? (
                        <Container>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel>현재학기</InputLabel>
                                    <Select
                                        value={userInfo.currentSemester}
                                        onChange={(e) => setLocalUserInfo({ ...userInfo, currentSemester: e.target.value })}
                                    >
                                        {[1,2,3,4,5,6,7,8,9].map((sem) => (
                                            <MenuItem key={sem} value={sem}>{sem}학기</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel>학적상태</InputLabel>
                                    <Select
                                        value={userInfo.currentStatus}
                                        onChange={(e) => setLocalUserInfo({ ...userInfo, currentStatus: e.target.value })}
                                    >
                                        <MenuItem value="재학">재학</MenuItem>
                                        <MenuItem value="휴학">휴학</MenuItem>
                                        <MenuItem value="재적">재적</MenuItem>
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <TextField
                                    type="number"
                                    label="전체 평점"
                                    value={userInfo.totalGPA}
                                    onChange={(e) => setLocalUserInfo({...userInfo, totalGPA: parseFloat(e.target.value)})}
                                    fullWidth
                                    inputProps={{ step: 0.1, min: 0, max: 4.5 }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    type="number"
                                    label="직전학기 평점"
                                    value={userInfo.lastGPA}
                                    onChange={(e) => setLocalUserInfo({...userInfo, lastGPA: parseFloat(e.target.value)})}
                                    fullWidth
                                    inputProps={{ step: 0.1, min: 0, max: 4.5 }}
                                />
                            </ListItem>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel>소득분위</InputLabel>
                                    <Select
                                        value={userInfo.incomeLevel}
                                        onChange={(e) => setLocalUserInfo({...userInfo, incomeLevel: e.target.value})}
                                    >
                                        {[1,2,3,4,5,6,7,8,9,10].map((level) => (
                                            <MenuItem key={level} value={level}>{level}분위</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl fullWidth>
                                    <InputLabel>거주지</InputLabel>
                                    <Select
                                        value={residenceInfo.residence}
                                        onChange={(e) => setResidenceInfo({ residence: e.target.value, city: '' })}
                                    >
                                        {Object.keys(cities).map((region) => (
                                            <MenuItem key={region} value={region}>
                                                {region}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            {cities[residenceInfo.residence] && (
                                <ListItem>
                                    <FormControl fullWidth>
                                        <InputLabel>시/군/구</InputLabel>
                                        <Select
                                            value={residenceInfo.city}
                                            onChange={(e) => setResidenceInfo({ ...residenceInfo, city: e.target.value })}
                                        >
                                            {cities[residenceInfo.residence]?.map((city) => (
                                                <MenuItem key={city} value={city}>
                                                    {city}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                            )}
                            <ListItem sx={{justifyContent: 'flex-end'}}>
                                <IconButton onClick={handleSaveClick}>
                                    <SaveIcon />
                                </IconButton>
                            </ListItem>
                        </Container>
                    ) : (
                        <Container>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>성별</Typography>
                                <Typography variant="body1">{userInfo.sex ? "여자" : "남자"}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>현재학기</Typography>
                                <Typography variant="body1">{userInfo.currentSemester}학기</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>학적상태</Typography>
                                <Typography variant="body1">{userInfo.currentStatus}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>전공</Typography>
                                <Typography variant="body1">{userInfo.major}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>전체 평점</Typography>
                                <Typography variant="body1">{userInfo.totalGPA} / 4.5</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>직전학기 평점</Typography>
                                <Typography variant="body1">{userInfo.lastGPA} / 4.5</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>소득분위</Typography>
                                <Typography variant="body1">{userInfo.incomeLevel}분위</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontWeight: 700, pr: 2 }}>거주지</Typography>
                                <Typography variant="body1">{userInfo.region}</Typography>
                            </ListItem>
                            <ListItem sx={{justifyContent: 'flex-end'}}>
                                <IconButton onClick={handleEditClick}>
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                        </Container>
                    )}
                </div>
            </List>
        </Dialog>
    );
};

export default UserInfoDialog;