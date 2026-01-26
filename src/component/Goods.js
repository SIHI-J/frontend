import axios from 'axios';
import '../css/table.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';

const Goods = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
const { setGoodsCount } = useAlert();
  const loadData = useCallback(() => {
    axios
      .get('http://localhost:9070/goods')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ 컴포넌트 최초 1회 실행
  useEffect(() => {
    loadData();
  }, [loadData]);

  const price = (value) => (value * 10).toLocaleString();

  const handleDelete = (g_code) => {
    if (!window.confirm('정말 삭제할까요?')) return;

    axios
      .delete(`http://localhost:9070/goods/${g_code}`)
      .then(() => {
        alert('삭제 완료!');
        setGoodsCount(prev => Math.max(0, prev - 1));
        loadData(); // 삭제 후 목록 다시 불러오기
        setGoodsCount(prev => Math.max(0, prev - 1));
      })
      .catch((err) => {
        console.log(err);
        alert('삭제 실패!');
      });
  };
  return (
    <div>
      <h2>Goods 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/goods/goodscreate`)}>글쓰기</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '160px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '174px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NUM</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.g_code}>
                <td>{item.g_code}</td>
                <td>{item.g_name}</td>
                <td>{price(item.g_cost)}원</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/goods/goodsupdate/${item.g_code}`)}
                    >
                      수정
                    </button>
                    <button className="del_btn" onClick={() => handleDelete(item.g_code)}>
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

export default Goods;