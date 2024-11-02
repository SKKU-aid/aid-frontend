import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        //확인로진
        
        navigate('/home');
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <img src="/logo.png" alt="SKKU 장학비서" className="login-logo" />
                <h1 id="login-title">로그인</h1>
            </div>
            <div className="login-form">
                <label htmlFor="userId">아이디</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디"
                />
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <button onClick={handleLogin} className="login-button">로그인</button>
            </div>
            <div className="login-links">
                <a href="/find-id">아이디/비밀번호 찾기</a>
                <a href="/signup">회원가입</a>
            </div>
        </div>
    );
};

export default Login;
