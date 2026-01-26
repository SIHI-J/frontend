import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join(props) {
  //상태값 관리를 위한 함수
  const [form, setForm] = useState({
    userid: '',
    username: '',
    password: '',
    repassword: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.repassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    axios.post('http://localhost:9070/users', {
      userid: form.userid,
      username: form.username,
      password: form.password,
    })
      .then(() => {
        alert('회원가입 완료!');
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        alert('회원가입 실패');
      });
  };
  return (
    <section className='login_page'>
      <h2>회원가입 페이지</h2>
      <form className='login_form' onSubmit={handleSubmit}>
        <p>
          <label htmlFor="">아이디</label>
          <input type="text" name="userid" id="userid" onChange={handleChange} value={form.userid} />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" onChange={handleChange} value={form.password} />
        </p>
        <p>
          <label htmlFor="repassword">비밀번호 확인</label>
          <input type="password" name="repassword" id="repassword" onChange={handleChange} value={form.repassword} />
        </p>
        <p>
          <label htmlFor="">이름</label>
          <input type="text" name="username" id="username" onChange={handleChange} value={form.username} />
        </p>
        <p>
          <input type="submit" value="회원가입" id='submit_btn' />
        </p>
      </form>
    </section>
  );
}

export default Join;