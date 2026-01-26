import React, { useCallback, useEffect, useState } from 'react';
import '../css/table.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from '../context/AlertContext';

const Customer = () => {
  const [data, setData] = useState([]); //json데이터 받기
  const { setCustomerCount } = useAlert();
  const navigate = useNavigate(); //url 주소로 가져오기 
  //리스트 출력
  const loadData = useCallback(() => {
    axios
      .get('http://localhost:9070/customer')
      .then(res => {
        setData(res.data);
        setCustomerCount(res.data.length);
      })
      .catch(err => console.log(err));
  }, [setCustomerCount]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleDelete = (no) => {
    if (!window.confirm('정말 삭제할까요?')) return;

    axios.delete(`http://localhost:9070/customer/customerupdate/${no}`)
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
      <h2>Customer 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/customer/customercreate`)}>글쓰기</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '200px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '174px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NO.</th>
              <th>NAME</th>
              <th>address</th>
              <th>tel</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.c_name}</td>
                <td>{item.c_address}</td>
                <td>{item.c_tel}</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/customer/customerupdate/${item.no}`)}
                    >
                      수정
                    </button>
                    <button className="del_btn" onClick={() => handleDelete(item.no)}>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
    </div>
  );
};

export default Customer;