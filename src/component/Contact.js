import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import '../css/fnq.css';
import BASE_URL from '../config';
function Contact() {
  const navigate = useNavigate();
  const { setContactCount } = useAlert();
  const [form, setForm] = useState({
    name: '',
    tel: '',
    email: '',
    txtbox: '',
    agree: false
  });

  // 공통 input 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 전화번호 필드일 경우 포맷팅 로직 적용
    if (name === 'tel') {
      let numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
      let formatted = numbers;

      if (numbers.length >= 8) {
        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
      } else if (numbers.length >= 4) {
        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      }

      setForm(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) return alert('성함을 입력해주세요.');
    if (!form.tel) return alert('전화번호를 입력하세요.');
    if (!form.email) return alert('이메일을 입력하세요.');
    if (!form.txtbox) return alert('내용을 입력하세요.');
    if (!form.agree) return alert('개인정보 처리방침에 체크해주세요.');

    try {
      const response = await axios.post(`${BASE_URL}/question`, form);
      if (response.status === 200) {
        alert('질문 등록이 완료되었습니다.');
        setContactCount(count => count + 1);
        setForm({ name: '', tel: '', email: '', txtbox: '', agree: false });
        navigate('/contact');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      alert('서버 오류로 인해 등록에 실패했습니다.');
    }
  };
  return (
    <main>
      <section className='fnq'>
        <div className="container">
          <p className="top-right">Contact US</p>
          <h2 className="title">
            정성을 다해 답변을<br />해 드리겠습니다
          </h2>

          <form
            name="질문과 답변"
            action="./api/fnqinput.php"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <div className="left">
                <div className="box">
                  <label className="label" htmlFor="name">성함</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="성함을 입력해주세요" />
                </div>

                <div className="box">
                  <label className="label" htmlFor="tel">전화번호</label>
                  <input type="tel" name="tel" id="tel" value={form.tel} onChange={handleChange}
                    placeholder="전화번호를 입력해주세요" maxLength={13} />
                </div>

                <div className="box">
                  <label className="label" htmlFor="email">이메일</label>
                  <input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력해주세요" />
                </div>
              </div>

              <div className="right">
                <div className="box textarea">
                  <label className="label" htmlFor="txtbox">내용</label>
                  <textarea name="txtbox" id="txtbox" placeholder="내용을 입력해주세요" value={form.txtbox} onChange={handleChange}></textarea>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="box">
                <label className="agree" htmlFor="agree">개인정보처리방침 동의합니다</label>
                <input type="checkbox" name="agree" id="agree" checked={form.agree} onChange={handleChange} />
              </div>

              <button className="send" type="submit">SEND</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
