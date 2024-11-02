import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoticeDetail from './components/Notices/NoticeDetail';

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ height: '100%', width: '100vw'}}>
        <Routes>
            <>
              <Route path="/" element={<Home isLogin={true} setIsLogin={setIsLogin} />} />
              <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
              <Route path="/signUp" element={<Signup/>} />
              <Route path="/notice/:id" element={<NoticeDetail />} />
            </>
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;