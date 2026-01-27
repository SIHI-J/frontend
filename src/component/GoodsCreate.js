import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/input.css';
import { useAlert } from '../context/AlertContext';
import BASE_URL from '../config';

function GoodsCreate(props) {
  //상태값 관리 함수
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });
  const { setGoodsCount } = useAlert();
  //url 주소 관리
  const navigate = useNavigate();
  //사용자가 입력하면 호출 값을 저장
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'g_cost' ? value.replace(/[^0-9]/g, '') : value
    }));
  }
  //신규 상품 틍록 버튼 클릭시 호출되는 함수 백앤드로 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/goods`, form)
      .then(() => {
        alert('상품이 등록 완료 되었습니다');
        setGoodsCount(prev => prev + 1);
        navigate('/goods');
      })
      .catch(err => {
        console.log(err);
        alert('등록 실패!');
      });
  };

  return (
    <main>
      <section className='create_section'>
        <h2>입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="g_name">상품명</label>
            <input
              type="text" name="g_name" id="g_name"
              onChange={handleChange}
              value={form.g_name}
              required />
          </p>
          <p>
            <label htmlFor="g_cost">가격 정보</label>
            <input
              type="number" name="g_cost" id="g_cost"
              onChange={handleChange}
              value={form.g_cost}
              required />
          </p>
          <button type="submit">신규 상품 등록</button>
        </form>
      </section>
    </main>
  );
}

export default GoodsCreate;