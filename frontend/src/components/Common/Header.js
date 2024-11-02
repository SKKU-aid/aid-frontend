import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Sidebar from '../Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: '#FFFFFF' }} >
            <Toolbar style={{ padding: '15px 100px', justifyContent: 'space-between', backgroundColor: '#fff', color: '#000', textAlign: 'center', alignItems: 'center', marginTop:'30px'}}>
            <div style={{width: '50px'}}><img src="/SKKU_2.png" alt="SKKU 장학비서" style={{ width: '180px', height: 'auto' }} /></div>
            <div style={{alignItems: 'center', display: 'flex'}}>
                
            </div>
            <div className="right-section" style={{ display: 'flex', alignItems: 'center' }}>
                {isLogin ? (
                    <Button color="inherit" onClick={handleSidebarOpen} >
                        <MenuIcon sx={{ width: '28px'}} />
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login" sx={{fontWeight: 900, fontSize: '15px'}}>
                        로그인
                    </Button>
                )}
            </div>
            </Toolbar>
        </AppBar>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} isLogin={isLogin} />
        </>
    );
};

export default Header;