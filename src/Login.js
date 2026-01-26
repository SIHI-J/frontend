import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const [loginForm, setLoginForm] = useState({ userid: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // 백엔드의 로그인 엔드포인트로 데이터 전송
    axios.post('http://localhost:9070/login', loginForm)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('userToken', token); // 브라우저에 토큰 저장
        alert('로그인 성공');
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || '로그인 중 오류가 발생했습니다.');
      });
  };
  return (
    <section className='login_page'>
      <h2>로그인 페이지</h2>
      <form className='login_form' onSubmit={handleLogin}>
        <p>
          <label htmlFor="userid">아이디</label>
          <input type="text" name="userid" id="userid" onChange={handleChange} value={loginForm.userid} required />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" onChange={handleChange} value={loginForm.password} required />
        </p>
        <p>
          <input type="submit" value="로그인" id='submit_btn' />
        </p>
        <p className='link'>
          <Link to='/'>아이디/비밀번호 찾기</Link> |
          <Link to='/register'>회원가입</Link>
        </p>
      </form>
      <dl>
        <dt>*로그인 구현 전체 구성</dt>
        <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청하기</dd>
        <dd>2. 백엔드(Backend : Node.js + Express) : 로그인 처리, JWT토큰 발급</dd>
        <dd>3. 데이터베이스(Database : MySQL) : 사용자 정보 저장 및 인증</dd>
        <dd>4. 보안 : 비밀번호 bycrpt 암호화, JMT로 인증을 유지</dd>
      </dl>
      <div className="">
        <p>데이터베이스 설계(users)</p>
        <pre>
          CREATE TABLE users (
          no INT AUTO_INCREMENT PRIMARY KEY,
          userid VARCHAR(100) UNIQUE NOT NULL,
          username VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL,
          datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
          INSERT INTO `users` (`no`, `userid`, `username`, `password`, `datetime`) VALUES
          (1, 'jeon', 'teacher', '1234', '2025-05-19 01:26:30'),
          (2, 'jeon1', 'teacher', '1234', '2025-05-29 01:27:05'),
          (3, 'jeon2', 'teacher', '1234', '2025-05-19 01:28:20'),
          (4, 'jeon3', 'teacher', '1234', '2025-05-19 01:29:08'),
          (5, 'jeon4', 'teacher', '1234', '2025-05-19 01:30:40'),
          (6, 'jeon5', 'teacher', '1234', '2025-05-29 01:31:25');
          {/* 3. UI화면 설계 - 로그인 폼, 회원가입 폼 구현 */}
        </pre>
      </div>
    </section>
  );
}

export default Login;