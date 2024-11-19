import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, Avatar, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import UserInfoDialog from './UserInfoDialog';
import axios from 'axios';

const Sidebar = ({ isOpen, onClose, isLogin }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(null);

    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('currentUserID');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userID}`);
                console.log(response.data);
                if (response.data.success) {
                    setUserInfo(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('사용자 정보를 불러오는데 실패했습니다.');
            }
        };

        if (isLogin) {
            fetchUserInfo();
        }
    }, [isLogin]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{ width: '300px' }}>
            <Button onClick={onClose} sx={{mt: 2, p: '0', width: 'max-content'}}>
                <ChevronLeftIcon sx={{color: 'gray'}}/>
            </Button>
            <List sx={{padding: '0 50px' }}>
                <ListItem sx={{height: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center', m: '50px 0 30px'}}>
                    {isLogin ? 
                    <>
                        <Avatar alt="프로필 사진" sx={{ width: '150px', height: '150px', mb: '20px', p: 1}} />
                        <Typography sx={{fontWeight: 800}}>{userName ? `${userName} 님` : "소공개 님"}</Typography>
                        <Button onClick={handleOpenDialog} sx={{backgroundColor: 'green', color: '#fff', m: 3, p: '5px 20px', '&:hover': {backgroundColor: 'yellowgreen'}, fontWeight: 600 }}>
                            내 정보 
                        </Button>
                    </>
                    : <AccountCircle sx={{ fontSize: 160, mb: '20px', color: 'gray' }} />}
                </ListItem>
            </List>
            <UserInfoDialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                userInfo={userInfo} 
                setUserInfo={setUserInfo}
                userName={userName}
            />
        </Drawer>
    );
};

export default Sidebar;