import { Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pics/Home'
import Pic from './pics/Detail'
import NavBar from './component/NavBar';
import TagFiltered from './pics/TagFiltered';
import { useState } from 'react';

const App = () => {
  const [q, setQ] = useState(null)
  return (
    <>
      <NavBar setQ={setQ}/>
      <Routes>
        <Route path='/tag/:tagSlug' element={<TagFiltered />} />
        <Route path='/:postId' element={<Pic/>}/>
        <Route exact path='/' element={<Home q={q}/>} />
      </Routes>
    </>
  );
}

export default App;
