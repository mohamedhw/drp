import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-image-crop/dist/ReactCrop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Layout from './Layout';
import NavBar from './component/NavBar';
import NotFound from './pics/NotFound';
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
import SavedPics from './pics/SavedPics';
import AllSavedPics from './pics/AllSavedPics';
import Tags from './pics/Tags';
import TopPics from './pics/TopPics';
import RandomPics from './pics/RandomPics';
import LatestPics from './pics/LatestPics';
import Delete from './pics/DeleteConfirmation';
import Cover from './component/CoverUploader';
import PicCrop from './pics/PicCrop';
import HotPics from './pics/HotPics';
import ForYouPics from './pics/ForYouPics';

const App = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCover, setShowCover] = useState(false);
    const [showCroper, setShowCroper] = useState(false);
    return (
        <>
            <Layout>
                <NavBar setModalShowLogin={setModalShow} setModalShowRegister={setModalShowRegister} setShow={setShow} />
                <Login show={modalShow} onHide={() => setModalShow(false)} />
                <Register show={modalShowRegister} onHide={() => setModalShowRegister(false)} setModalShow={setModalShow} />
                <Search show={show} setShow={() => setShow(false)} />
                <Delete show={showDelete} setShow={() => setShowDelete(false)} />
                <Cover show={showCover} setShow={() => setShowCover(false)} />
                <PicCrop show={showCroper} setShow={() => setShowCroper(false)} />

                <Routes>
                    <Route element={<PrivetRoute setModalShow={setModalShow} />}>
                        <Route exact path='/create' element={<Create />} />
                        <Route exact path='/profile' element={<Profile setShow={setShowCover} />} />
                        <Route exact path='/saved' element={<SavedPics />} />
                        <Route exact path='/moresaved' element={<AllSavedPics />} />
                        <Route exact path='/foryou/:page?' element={<ForYouPics />} />
                    </Route>
                    <Route exact path='/tags' element={<Tags />} />
                    <Route exact path='/userpics/:authorname' element={<UserPics />} />
                    <Route exact path='/search' element={<Searched />} />
                    <Route exact path='/tag/:tagSlug' element={<TagFiltered />} />
                    <Route exact path='/pic/:postId' element={<Pic setShowDelete={setShowDelete} setShowCroper={setShowCroper} />} />
                    <Route exact path='/userallpics/:username/' element={<AllUserPics />} />
                    <Route exact path='/hot/:page?' element={<HotPics />} />
                    <Route exact path='/top/:page?' element={<TopPics />} />
                    <Route exact path='/random/:page?' element={<RandomPics />} />
                    <Route exact path='/:page?' element={<LatestPics />} />
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
