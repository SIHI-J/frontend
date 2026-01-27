import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../config';

function CustomerUpdate(props) {
  //상태값 관리 함수
  const [form, setForm] = useState({
    c_name: '',
    c_address: '',
    c_tel: ''
  });
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');

    if (numbers.length < 4) return numbers;
    if (numbers.length < 8)
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;

    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  };
  const { no } = useParams();
  //url 주소 관리
  const navigate = useNavigate();
  //상품 정보 불러오기
  useEffect(() => {
    axios.get(`${BASE_URL}/customer/customerupdate/${no}`)
      .then(res => {
        setForm({
          c_name: res.data.c_name,
          c_address: res.data.c_address,
          c_tel: res.data.c_tel
        });
      })
      .catch(err => {
        console.log(err);
        alert('데이터 불러오기 실패');
      });
  }, [no]);
  //사용자가 입력하면 호출 값을 저장
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'c_tel' ? formatPhoneNumber(value) : value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${BASE_URL}/customer/customerupdate/${no}`, {
      c_name: form.c_name.trim(),
      c_address: form.c_address.trim(),
      c_tel: formatPhoneNumber(form.c_tel)
    })
      .then(() => {
        alert('수정 완료!');
        navigate('/customer');
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
            <label htmlFor="c_name">식당 이름</label>
            <input
              type="text" name="c_name" id="c_name"
              onChange={handleChange}
              value={form.c_name}
              required />
          </p>
          <p>
            <label htmlFor="c_address">식당 주소</label>
            <input
              type="text" name="c_address" id="c_address"
              onChange={handleChange}
              value={form.c_address}
              required />
          </p>
          <p>
            <label htmlFor="c_tel">전화 번호</label>
            <input
              type="text" name="c_tel" id="c_tel"
              onChange={handleChange}
              value={form.c_tel}
              required />
          </p>
          <button type="submit">예약 수정</button>
        </form>
      </section>
    </main>
  );
}

export default CustomerUpdate;