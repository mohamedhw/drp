import { Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pics/Home'
import Pic from './pics/Detail'
import NavBar from './component/NavBar';
import TagFiltered from './pics/TagFiltered';
import { useState } from 'react';
import Layout from './Layout';
import Login from './pics/Login';
import Register from './pics/Register';

const App = () => {
  const [q, setQ] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);

  return (
    <>
      <Layout>
        <NavBar setQ={setQ} setModalShowLogin={setModalShow} setModalShowRegister={setModalShowRegister}/>
        <Login show={modalShow} onHide={() => setModalShow(false)}/>
        <Register show={modalShowRegister} onHide={() => setModalShowRegister(false)} />
        <Routes>
          <Route exact path='/tag/:tagSlug' element={<TagFiltered />} />
          <Route exact path='/:postId' element={<Pic/>}/>
          <Route exact path='/' element={<Home q={q}/>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

