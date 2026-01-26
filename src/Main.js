import React from 'react';

function Main(props) {
  return (
    <div>
      <h2>메인페이지</h2>
      <dl>
        <dt>기능 추가 사항</dt>
        <dd>1. create 메뉴 : 새로운 페이지로 이동하여 자료 입력</dd>
        <dd>2. update 메뉴 : 새로운 페이지로 이동하여 자료 수정</dd>
        <dd>3. delete 메뉴 : 새로운 페이지로 이동하여 자료 삭제 요청(axios.delete)</dd>
        <dd>4. 삭제 후 목록 다시 불러오기(자동 갱신)</dd>
        <dd>5. 데이터 베이스에서 자료가 변경되면 자동 인식되어 숫자 뱃지가 자동으로 인식되도록 하기</dd>
      </dl>
    </div>
  );
}

export default Main;