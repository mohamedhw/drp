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
          <Route path='/create' element={<Create />} />
          <Route path='/profile' element={<Profile />} />
          <Route exact path='/tag/:tagSlug' element={<TagFiltered />} />
          <Route exact path='/pic/:postId' element={<Pic/>}/>
          <Route exact path='/' element={<Home q={q}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

