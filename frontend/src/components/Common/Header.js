import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Sidebar from '../Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ isLogin }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUserID');
        navigate('/login');
    };

    return (
        <>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: '#FFFFFF' }}>
            <Toolbar
                style={{
                    padding: '15px 100px',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    color: '#000',
                    textAlign: 'center',
                    alignItems: 'center',
                    marginTop: '30px',
                }}
            >
                {/* 로고 */}
                <div style={{ width: '50px' }}>
                    <img src="/SKKU_2.png" alt="SKKU 장학비서" style={{ width: '180px', height: 'auto' }} />
                </div>
                
                {/* 버튼 섹션 */}
                <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                    {isLogin ? (
                        <>
                            {/* 로그아웃 버튼 */}
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                sx={{ fontWeight: 700, fontSize: '16px', marginRight: '10px'}}
                            >
                                로그아웃
                            </Button>
                            {/* 메뉴 아이콘 */}
                            <Button color="inherit" onClick={handleSidebarOpen}>
                                <MenuIcon sx={{ width: '28px' }} />
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* 로그인 버튼 */}
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                sx={{ fontWeight: 700, fontSize: '16px', marginRight: '10px' }}
                            >
                                로그인
                            </Button>
                            {/* 회원가입 버튼 */}
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                                sx={{ fontWeight: 700, fontSize: '16px' }}
                            >
                                회원가입
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
        {/* 사이드바 */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} isLogin={isLogin} />
        </>
    );
};

export default Header;