import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
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
import PrivetRoute from './PrivetRoute';
import UserPics from './pics/UserPics';
import AllUserPics from './pics/AllUserPics';
import SavedPics from './component/SavedPics';
import AllSavedPics from './pics/AllSavedPics';

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);
  const [show, setShow] = useState(false);
  // const [q, setQ] = useState(null)

  return (
    <>
      <Layout>

        <NavBar setModalShowLogin={setModalShow} setModalShowRegister={setModalShowRegister} setShow={setShow} />
        <Login show={modalShow} onHide={() => setModalShow(false)}/>
        <Register show={modalShowRegister} onHide={() => setModalShowRegister(false)} setModalShow={setModalShow}/>
        <Search show={show} setShow={() => setShow(false)}/>

        <Routes>
          <Route element={<PrivetRoute/>}>
            <Route path='/create' element={<Create />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/saved' element={<SavedPics />} />
            <Route path='/moresaved' element={<AllSavedPics/>} />
          </Route>
          <Route path='/userpics/:authorname' element={<UserPics/>}/>
          <Route exact path='/search/:searchpage?' element={<Searched />}/>
          <Route exact path='/tag/:tagSlug' element={<TagFiltered />} />
          <Route exact path='/pic/:postId' element={<Pic/>}/>
	        <Route exact path='/userallpics/:username/' element={<AllUserPics/>}/>
          <Route exact path='/:page?' element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
