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
import FindId from './pages/FindId';
import FindId2 from './pages/FindId2';
import FindId3 from './pages/FindId3';

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
    const userID = localStorage.getItem('currentUserID');
    if (userID) {
      setIsLogin(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100%', width: '100vw'}}>
        <Routes>
            <>
              <Route path="/" element={<Home isLogin={isLogin}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<Signup isLogin={isLogin} />} />
              <Route path="/notice/:id" element={<NoticeDetail />} />
              <Route path="/signUp2" element={<Signup2/>} />
              <Route path="/signUp3" element={<Signup3/>} />
              <Route path="/signUp4" element={<Signup4/>} />
              <Route path="/find-id" element={<FindId/>} />
              <Route path="/find-id2" element={<FindId2/>} />
              <Route path="/find-id3" element={<FindId3/>} />
              <Route path="/home" element={<Home isLogin={isLogin}/>} />
            </>
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;