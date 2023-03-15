import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RequiredAuth from './context/RequiredAuth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Missing from './pages/missing/Missing';
import Messenger from './pages/messenger/Messenger';
import Layout from './Layout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            {/*Protected Routes*/}
            <Route element={<RequiredAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='profile/:username' element={<Profile />} />
              <Route path='messenger' element={<Messenger />} />
            </Route>
            {/* Error Handle Route // Catch ALL */}
            <Route path='*' element={<Missing />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
