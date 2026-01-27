import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/input.css';
import BASE_URL from '../config';

function BookstoreUpdate(props) {
  //상태값 관리를 위한 함수
  const { code } = useParams();
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: '',
    owner_nm: '',
    tel_num: ''
  });

  const navigate = useNavigate();
  //2. 백엔드 서버측으로 넘길 데이터를 통신해서 성공, 실패여부를 출력한다.
  useEffect(() => {
    axios.get(`${BASE_URL}/book_store/book_storeupdate/${code}`)
      //성공이면 출력
      .then(res => {
        console.log('서버 응답 값 : ', res.data);

        //배열
        if (Array.isArray(res.data)) {
          setForm(res.data[0])
        } else {
          setForm(res.data);
        }
      })
      //실패면 오류 메세지
      .catch(err => console.log('조회 오류 : ', err));
  }, [code]);

  //3. 사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange = (e) => {
    setForm({
      ...form, //기존 배열에 새롭게 추가
      [e.target.name]: e.target.value//값을 저장
    });
  }

  //4. 수정하기 버튼을 클릭시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    //비동기로 업데이트할 내용을 백엔드로 전달해줌
    axios.put(`${BASE_URL}/book_store/book_storeupdate/${code}`, {
      name: form.name,
      area1: form.area1,
      area2: form.area2,
      area3: form.area3,
      book_cnt: form.book_cnt,
      owner_nm: form.owner_nm,
      tel_num: form.tel_num
    })
      .then(() => {//통신이 성공적으로 이루어질 경우
        alert('상품정보가 수정 완료되었습니다.');
        navigate('/book_store'); //goods페이지로 이동하기
      })
      .catch( //통신이 실패할 경우
        err => console.log('수정 실패 : ', err));
  };

  return (
    <main>
      <section className='edit_section'>
        <h2>book_store 수정을 위한 페이지</h2>
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
          <button type='submit'>서점 수정하기</button>
        </form>
      </section>
    </main>
  );
}

export default BookstoreUpdate;