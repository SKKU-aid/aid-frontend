import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoticeDetail from './components/Notices/NoticeDetail';
import Signup2 from './pages/Signup2';
import Signup3 from './pages/Signup3';
import Signup4 from './pages/Signup4';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#249c28',
    },
  }
});

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 userID가 존재하면 로그인 상태로 설정
    //UserID를 그냥 1234로 해줘.
    localStorage.setItem('userID', 'example1@skku.edu');
    if (localStorage.getItem('userID')) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('userID'); // 로그아웃 시 로컬 스토리지에서 userID 제거
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100%', width: '100vw'}}>
        <Routes>
            <>
              <Route path="/" element={<Home isLogin={false} setIsLogin={setIsLogin} />} />
              <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
              <Route path="/signUp" element={<Signup/>} />
              <Route path="/notice/:id" element={<NoticeDetail />} />
              <Route path="/signUp2" element={<Signup2/>} />
              <Route path="/signUp3" element={<Signup3/>} />
              <Route path="/signUp4" element={<Signup4/>} />
              <Route path="/home" element={<Home/>} />
            </>
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;