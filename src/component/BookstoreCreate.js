import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/input.css';
import BASE_URL from '../config';

function BookstoreCreate(props) {
  //상태값 관리를 위한 함수
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: '',
    owner_nm: '',
    tel_num: ''
  });

  //url주소관리
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form, //기존 배열값에 새롭게 추가한다.
      [e.target.name]: e.target.value
    });
  }

  //신규상품 등록하기 버튼 클릭시 호출되는 함수 == backend 서버로 전달 
  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 막기

    axios.post(`${BASE_URL}/book_store`, form)
      .then(() => { //통신이 성공하면
        alert('상품이 등록 완료 되었습니다.');
        navigate('/book_store'); //상품목록 페이지로 이동하기
      })
      .catch(err => console.log(err));  //실패시 콘솔모드에 에러를 출력함
  }

  return (
    <main>
      <section className='create_section'>
        <h2>book_store 입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label>서점명 : </label>
            <input
              type='text'
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>지역1 : </label>
            <input
              type="text"
              name="area1"
              value={form.area1}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>지역2 : </label>
            <input
              type="text"
              name="area2"
              value={form.area2}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>지역3 : </label>
            <input
              type="text"
              name="area3"
              value={form.area3}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>도서수 : </label>
            <input
              type="text"
              name="book_cnt"
              value={form.book_cnt}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>사장명 : </label>
            <input
              type="text"
              name="owner_nm"
              value={form.owner_nm}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>전화번호 : </label>
            <input
              type="text"
              name="tel_num"
              value={form.tel_num}
              onChange={handleChange}
              required
            />
          </p>
          <button type='submit'>신규 서점 등록하기</button>
        </form>
      </section>
    </main>
  );
}

export default BookstoreCreate;