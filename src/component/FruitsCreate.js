import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';

function FruitsCreate(props) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    color: '',
    country: ''
  });
  const { setFruitsCount } = useAlert();
  const navigate = useNavigate();
  const [isColorOpen, setIsColorOpen] = useState(false);
  const colorWrapRef = useRef(null);


  // 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'price'
        ? value.replace(/[^0-9]/g, '')
        : value
    }));
  };
  const handleColorSelect = (color) => {
    setForm(prev => ({ ...prev, color }));
    setIsColorOpen(false);
  };

  // 바깥 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!colorWrapRef.current) return;
      if (!colorWrapRef.current.contains(e.target)) {
        setIsColorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // 등록
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9070/fruits', {
      name: form.name.trim(),
      price: Number(form.price),
      color: form.color,
      country: form.country.trim()
    })
      .then(() => {
        alert('과일 등록 완료!');
        setFruitsCount(prev => prev + 1); // 배지 숫자 증가
        navigate('/fruits');
      })
      .catch(err => {
        console.log(err);
        alert('등록 실패');
      });
  };
  return (
    <main>
      <section className='create_section'>
        <h2>입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="name">과일 이름</label>
            <input type="text" name="name" id="name"
              onChange={handleChange}
              value={form.name}
              required
            />
          </p>
          <p>
            <label htmlFor="price">과일 가격</label>
            <input type="text" name="price" id="price"
              onChange={handleChange}
              value={form.price}
              required
            />
          </p>
          <p>
            <label htmlFor="color">과일 색상</label>

            <div className="color_select" ref={colorWrapRef}>
              <button
                type="button"
                className={`color_selected ${form.color ? 'has_value' : ''}`}
                onClick={() => setIsColorOpen(prev => !prev)}
                aria-expanded={isColorOpen}
                aria-haspopup="listbox"
              >
                <span className={`dot ${getColorClass(form.color)}`} />
                {form.color || '색상 선택'}
                <span className={`arrow ${isColorOpen ? 'open' : ''}`}>▾</span>
              </button>

              {isColorOpen && (
                <ul className="color_options" role="listbox" id="color">
                  <li className="red" onClick={() => handleColorSelect('빨강')}>빨강</li>
                  <li className="orange" onClick={() => handleColorSelect('주황')}>주황</li>
                  <li className="yellow" onClick={() => handleColorSelect('노랑')}>노랑</li>
                  <li className="green" onClick={() => handleColorSelect('초록')}>초록</li>
                  <li className="purple" onClick={() => handleColorSelect('보라')}>보라</li>
                  <li className="black" onClick={() => handleColorSelect('검정')}>검정</li>
                  <li className="brown" onClick={() => handleColorSelect('갈색')}>갈색</li>
                </ul>
              )}
            </div>
            {!form.color && (
              <small className="hint">색상을 선택해주세요.</small>
            )}
          </p>
          <p>
            <label htmlFor="country">원산지(지역)</label>
            <input type="text" name="country" id="country"
              onChange={handleChange}
              value={form.country}
              required
            />
          </p>
          <button type='submit'>과일 정보 등록</button>
        </form>
      </section>
    </main>
  );
}
function getColorClass(color) {
  switch (color) {
    case '빨강': return 'red';
    case '주황': return 'orange';
    case '노랑': return 'yellow';
    case '초록': return 'green';
    case '보라': return 'purple';
    case '검정': return 'black';
    case '갈색': return 'brown';
    default: return 'none';
  }
}

export default FruitsCreate;