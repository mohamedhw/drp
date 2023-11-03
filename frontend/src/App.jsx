import { Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Layout from './Layout';
import NavBar from './component/NavBar';
import NotFound from './pics/NotFound';
import Home from './pics/Home'
import Pic from './pics/Detail'
import TagFiltered from './pics/TagFiltered';
import Login from './pics/Login';
import Register from './pics/Register';
import Profile from './pics/Profile';
import Create from './pics/Create';
import Search from './pics/Search';
import Searched from './pics/Searched';



const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);
  const [show, setShow] = useState(false);
  // const [q, setQ] = useState(null)

  return (
    <>
      <Layout>

        <NavBar setModalShowLogin={setModalShow} setModalShowRegister={setModalShowRegister} setShow={setShow}/>
        <Login show={modalShow} onHide={() => setModalShow(false)}/>
        <Register show={modalShowRegister} onHide={() => setModalShowRegister(false)} />
        <Search show={show} setShow={() => setShow(false)}/>
        
        <Routes>
          <Route exact path='/search/:searchpage?' element={<Searched />}/>
          <Route path='/create' element={<Create />} />
          <Route path='/profile' element={<Profile />} />
          <Route exact path='/tag/:tagSlug' element={<TagFiltered />} />
          <Route exact path='/pic/:postId' element={<Pic/>}/>
          <Route exact path='/:page?' element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

