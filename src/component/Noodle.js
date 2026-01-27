import React, { useCallback, useEffect, useState } from 'react';
import '../css/table.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from '../context/AlertContext';
import BASE_URL from '../config';
const Noodle = () => {
  const [data, setData] = useState([]); //json데이터 받기
  const navigate = useNavigate(); //url 주소로 가져오기 
  //리스트 출력
  const { setNoodleCount } = useAlert();
  const loadData = useCallback(() => {
    axios
      .get(`${BASE_URL}/noodle`)
      .then(res => {
        setData(res.data);
        setNoodleCount(res.data.length);
      })
      .catch(err => console.log(err));
  }, [setNoodleCount]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const price = (value) => {
    return (value * 1).toLocaleString();
  };
  const formatDate = (value) => {
    if (!value) return '';
    const str = value.toString();
    return `${str.slice(0, 4)}년 ${str.slice(4, 6)}월 ${str.slice(6, 8)}일`;
  };
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
  const handleDelete = (num) => {
    if (!window.confirm('정말 삭제할까요?')) return;

    axios.delete(`${BASE_URL}/noodle/${num}`)
      .then(() => {
        alert('삭제 완료!');
        loadData(); // 삭제 후 목록 다시 불러오기
      })
      .catch((err) => {
        console.log(err);
        alert('삭제 실패!');
      });
  };
  return (
    <div>
      <h2>Noodle 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/noodle/noodlecreate`)}>글쓰기</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '40px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '160px' }} />
            <col style={{ width: '160px' }} />
            <col style={{ width: '174px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NUM</th>
              <th>NAME</th>
              <th>COMPANY</th>
              <th>kind</th>
              <th>price</th>
              <th>E-DATE</th>
              <th>reg-date</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.kind}</td>
                <td>{price(item.price)}원</td>
                <td>{formatDate(item.e_date)}</td>
                <td>{formatDateTime(item.reg_date)}</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/noodle/noodleupdate/${item.num}`)}
                    >
                      수정
                    </button>
                    <button className="del_btn" onClick={() => handleDelete(item.num)}>
                      삭제
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

export default Noodle;