import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../config';

function GoodsUpdate(props) {
  //상태값 관리 함수
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });
  const { g_code } = useParams();
  //url 주소 관리
  const navigate = useNavigate();
  //상품 정보 불러오기
  useEffect(() => {
    axios.get(`${BASE_URL}/goods/goodsupdate/${g_code}`)
      .then(res => {
        setForm({
          g_name: res.data.g_name,
          g_cost: res.data.g_cost * 10 // ⭐ 화면에는 *10 해서 보여줌
        });
      })
      .catch(err => {
        console.log(err);
        alert('데이터 불러오기 실패');
      });
  }, [g_code]);
  //사용자가 입력하면 호출 값을 저장
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'g_cost' ? value.replace(/[^0-9]/g, '') : value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${BASE_URL}/goods/goodsupdate/${g_code}`, {
      g_name: form.g_name.trim(),
      g_cost: Number(form.g_cost) / 10 // ⭐ 여기!
    })
      .then(() => {
        alert('수정 완료!');
        navigate('/goods');
      })
      .catch(err => {
        console.log('status:', err.response?.status);
        console.log('data:', err.response?.data);
        alert('수정 실패');
      });
  };


  return (
    <main>
      <section className='edit_section'>
        <h2>수정을 위한 페이지</h2>
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
          <button type="submit">수정 하기</button>
        </form>
      </section>
    </main>
  );
}

export default GoodsUpdate;