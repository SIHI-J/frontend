import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerCreate(props) {
  //상태값 관리 함수
  const [form, setForm] = useState({
    c_name: '',
    c_address: '',
    c_tel: ''
  });
  //url 주소 관리
  const navigate = useNavigate();
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');

    if (numbers.length < 4) return numbers;
    if (numbers.length < 8)
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;

    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  };
  //사용자가 입력하면 호출 값을 저장
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'c_tel'
        ? formatPhoneNumber(value)
        : value
    }));
  };
  //신규 상품 틍록 버튼 클릭시 호출되는 함수 백앤드로 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9070/customer', form)
      .then(() => {
        alert('상품이 등록 완료 되었습니다');
        navigate('/customer');
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
          <button type="submit">신규 예약 등록</button>
        </form>
      </section>
    </main>
  );
}

export default CustomerCreate;