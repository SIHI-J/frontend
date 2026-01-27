import React, { useCallback, useEffect, useState } from 'react';
import '../css/table.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from '../context/AlertContext';
import BASE_URL from '../config';
const Bookstore = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setBookstoreCount } = useAlert();
  const loadData = useCallback(() => {
    axios
      .get(`${BASE_URL}/book_store`)
      .then(res => {
        setData(res.data);
        setBookstoreCount(res.data.length);
      })
      .catch(err => console.log(err));
  }, [setBookstoreCount]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (code) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios.delete(`${BASE_URL}/book_store/${code}`)
      .then(() => {
        alert('삭제 완료!');
        loadData();
      })
      .catch((err) => {
        console.log(err);
        alert('삭제 실패');
      });
  };

  return (
    <div>
      <h2>Bookstore 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/book_store/book_storecreate`)}>글쓰기</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '80px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '174px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NO</th>
              <th>NAME</th>
              <th>AREA1</th>
              <th>AREA2</th>
              <th>AREA3</th>
              <th>BOOKS</th>
              <th>OWNER</th>
              <th>TEL</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(bookstore => (
              <tr key={bookstore.code}>
                <td>{bookstore.code}</td>
                <td>{bookstore.name}</td>
                <td>{bookstore.area1}</td>
                <td>{bookstore.area2}</td>
                <td>{bookstore.area3}</td>
                <td>{bookstore.book_cnt}권</td>
                <td>{bookstore.owner_nm}</td>
                <td>{bookstore.tel_num}</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/book_store/book_storeupdate/${bookstore.code}`)}
                    >
                      수정
                    </button>
                    <button className="del_btn" onClick={() => handleDelete(bookstore.code)}>
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

export default Bookstore;