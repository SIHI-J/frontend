import { useEffect } from 'react';
import { useAlert } from './context/AlertContext';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Contact from './component/Contact';
import AdContact from './component/AdContact';
import Fruits from './component/Fruits';
import FruitsCreate from './component/FruitsCreate';
import FruitsUpdate from './component/FruitsUpdate';
import Noodle from './component/Noodle';
import NoodleCreate from './component/NoodleCreate';
import NoodleUpdate from './component/NoodleUpdate';
import Goods from './component/Goods';
import GoodsCreate from './component/GoodsCreate';
import GoodsUpdate from './component/GoodsUpdate';
import Customer from './component/Customer';
import CustomerCreate from './component/CustomerCreate';
import CustomerUpdate from './component/CustomerUpdate';
import Bookstore from './component/Bookstore';
import BookstoreCreate from './component/BookstoreCreate';
import BookstoreUpdate from './component/BookstoreUpdate';
import Login from './Login';
import Join from './Join';
import Header from './layout/Header';

function AppContent() {
  const { pushNotification } = useAlert();

  useEffect(() => {
    const eventSource = new EventSource(
  'https://port-0-backend-server-mkulo9cb3bc6cf69.sel3.cloudtype.app/'
);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      pushNotification(data.type); // goods / fruits / bookstore
    };

    return () => eventSource.close();
  }, [pushNotification]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Join />} />
        <Route path='/adcontact' element={<AdContact />} />
        <Route path='/goods' element={<Goods />} />
        <Route path='/goods/goodscreate' element={<GoodsCreate />} />
        <Route path='/goods/goodsupdate/:g_code' element={<GoodsUpdate />} />
        <Route path='/noodle' element={<Noodle />} />
        <Route path='/noodle/noodlecreate' element={<NoodleCreate />} />
        <Route path='/noodle/noodleupdate/:num' element={<NoodleUpdate />} />
        <Route path='/fruits' element={<Fruits />} />
        <Route path='/fruits/fruitscreate' element={<FruitsCreate />} />
        <Route path='/fruits/fruitsupdate/:num' element={<FruitsUpdate />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/customer/customercreate' element={<CustomerCreate />} />
        <Route path='/customer/customerupdate/:no' element={<CustomerUpdate />} />
        <Route path='/book_store' element={<Bookstore />} />
        <Route path='/book_store/book_storecreate' element={<BookstoreCreate />} />
        <Route path='/book_store/book_storeupdate/:code' element={<BookstoreUpdate />} />
      </Routes>
    </>
  );
}

export default AppContent;
