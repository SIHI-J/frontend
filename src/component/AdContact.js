import axios from 'axios';
import '../css/table.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdContact = () => {
  const [data, setData] = useState([]); //json데이터 받기
  const navigate = useNavigate(); //url 주소로 가져오기 
  //리스트 출력
  const loadData = () => {
    axios
      .get('http://localhost:9070/question')
      //성공시 데이터 저장
      .then(res => setData(res.data))
      //실패시 에러 출력
      .catch(err => console.log(err))
  }
  //컴포넌트 생성시 한번만 불러오기
  useEffect(() => {
    loadData();
  }, [])

  const formatDateTime = (value) => {
    if (!value) return '';

    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = date.getHours();
    const ampm = hours < 12 ? '오전' : '오후';

    const hour = String(hours % 12 === 0 ? 12 : hours % 12).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}시 ${minute}분`;
  };
  return (
    <div>
      <h2>문의사항 관리자 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/contact`)}>문의사항 작성 페이지</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '160px' }} />
            <col />
            <col style={{ width: '250px' }} />
            <col style={{ width: '104px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NUM</th>
              <th>NAME</th>
              <th>TEL</th>
              <th>EMAIL</th>
              <th>TXT</th>
              <th>DATE</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.txtbox}</td>
                <td>{formatDateTime(item.date)}</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/contact/contactupdate/${item.id}`)}
                    >
                      답변
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdContact;