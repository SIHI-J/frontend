import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

function NoodleCreate(props) {
  //상태값 관리를 위한 함수
  const [form, setForm] = useState({
    num: '',
    name: '',
    company: '',
    kind: '',
    price: '',
    e_date: '',
    reg_date: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/[^0-9]/g, '')
        : value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/noodle`, {
      name: form.name,
      company: form.company,
      kind: form.kind,
      price: form.price,
      e_date: form.e_date
    })
      .then(() => {
        alert('라면 등록 완료!');
        navigate('/noodle');
      })
      .catch(err => {
        console.log(err);
        alert('등록 실패');
      });
  };
  return (
    <main>
      <section className='create_section'>
        <h2>입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="">상품명</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="">회사명</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="">종류</label>
            <select name="kind" value={form.kind} onChange={handleChange} required>
              <option value="">종류 선택</option>
              <option value="M">봉지</option>
              <option value="C">컵</option>
            </select>
          </p>
          <p>
            <label htmlFor="">가격</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="">제조 날짜</label>
            <input
              type="date"
              name="e_date"
              value={form.e_date}
              onChange={handleChange}
            />
          </p>
          <button type="submit">라면 등록하기</button>
        </form>
      </section>
    </main>
  );
}

export default NoodleCreate;