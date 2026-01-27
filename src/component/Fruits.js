import axios from 'axios';
import '../css/table.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import BASE_URL from '../config';

const Fruits = () => {
  const [data, setData] = useState([]); //json데이터 받기
  const [currentPage, setCurrentPage] = useState(1);
  const { setFruitsCount } = useAlert();
  const itemsPerPage = 5;
  const LastItem = currentPage * itemsPerPage;
  const FirstItem = LastItem - itemsPerPage;
  const currentItems = data.slice(FirstItem, LastItem);
  const navigate = useNavigate(); //url 주소로 가져오기 
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const goPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  //리스트 출력
  const loadData = useCallback(() => {
    axios
      .get(`${BASE_URL}/fruits`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //컴포넌트 생성시 한번만 불러오기
  useEffect(() => {
    loadData();
  }, [loadData]);
  const price = (value) => {
    return (value).toLocaleString();
  };
  const handleDelete = (num) => {
    if (!window.confirm('정말 삭제 할까요?')) return;
    axios.delete(`${BASE_URL}/fruits/${num}`)
      .then(() => {
        alert('삭제 완료!');
        setFruitsCount(prev => Math.max(0, prev - 1));

        loadData();
        setCurrentPage(prev => Math.max(1, prev - 1));

      })
      .catch((err) => {
        console.log(err);
        alert('삭제 실패');
      });
  };

  return (
    <div>
      <h2>Fruits 페이지</h2>
      <div className="create_btn"><button onClick={() => navigate(`/fruits/fruitscreate`)}>글쓰기</button></div>
      <div className="table_wrap">
        <table className='data_list'>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '60px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '174px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>NUM</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COLOR</th>
              <th>COUNTRY</th>
              <th>메뉴(삭제/수정)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{price(item.price)}원</td>
                <td>{item.color}</td>
                <td>{item.country}</td>
                <td>
                  <div className="btn_wrap">
                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/fruits/fruitsupdate/${item.num}`)}
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
      <div className="pagination">
        <button
          onClick={goPrevPage}
          disabled={currentPage === 1}
        >
          이전
        </button>

        <span className="current_page">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={goNextPage}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
      <div className="pagenumber">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Fruits;