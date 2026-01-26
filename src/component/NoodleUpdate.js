import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function NoodleUpdate(props) {
  //상태값 관리를 위한 함수
  const { num } = useParams();
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
  useEffect(() => {
    axios.get(`http://localhost:9070/noodle/noodleupdate/${num}`)
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
  }, [num]);

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
    axios.put(`http://localhost:9070/noodle/noodleupdate/${num}`, {
      name: form.name,
      company: form.company,
      kind: form.kind,
      price: form.price,
      e_date: form.e_date
    })
      .then(() => {//통신이 성공적으로 이루어질 경우
        alert('라면정보가 수정 완료되었습니다.');
        navigate('/noodle'); //goods페이지로 이동하기
      })
      .catch( //통신이 실패할 경우
        err => console.log('수정 실패 : ', err));
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

export default NoodleUpdate;