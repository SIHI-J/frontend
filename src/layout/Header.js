import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
function Header(props) {
  const { goodsCount, setGoodsCount, fruitsCount, setFruitsCount, noodleCount, setNoodleCount, bookstoreCount, setBookstoreCount, customerCount, setCustomerCount, contactCount, setContactCount } = useAlert();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // 여러 개의 요청을 동시에 병렬로 처리합니다.
        const [noodle, bookstore, customer] = await Promise.all([
          axios.get('http://localhost:9070/noodle'),
          axios.get('http://localhost:9070/book_store'),
          axios.get('http://localhost:9070/customer')
        ]);

        setNoodleCount(noodle.data.length);
        setBookstoreCount(bookstore.data.length);
        setCustomerCount(customer.data.length);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };

    fetchCounts();
  }, [setNoodleCount, setBookstoreCount, setCustomerCount]);
  return (

    <header>
      <h1>Frontend</h1>
      <nav>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link
            to="/goods"
            onClick={() => setGoodsCount(0)}
          >
            Goods
            {goodsCount > 0 && <span className="badge">+{goodsCount}</span>}
          </Link></li>
          <li>
            <Link to='/noodle'>
              Noodle
              {noodleCount > 0 && <span className="badge">{noodleCount}</span>}
            </Link>
          </li>
          <li><Link to='/fruits' onClick={() => setFruitsCount(0)}>FRUITS{fruitsCount > 0 && <span className="badge">+{fruitsCount}</span>}</Link></li>
          <li>
            <Link to='/customer'>
              Customer
              {customerCount > 0 && <span className="badge">{customerCount}</span>}
            </Link>
          </li>
          <li>
            <Link to='/book_store'>
              Bookstore
              {bookstoreCount > 0 && <span className="badge">{bookstoreCount}</span>}
            </Link>
          </li>
          <li><Link to='/contact' onClick={() => setContactCount(0)}>CONTACT{contactCount > 0 && <span className="badge">+{contactCount}</span>}</Link></li>
          <li><Link to='/login'>LOGIN</Link></li>
          <li><Link to='/register'>JOIN</Link></li>
        </ul>
      </nav>
    </header>

  );
}

export default Header;