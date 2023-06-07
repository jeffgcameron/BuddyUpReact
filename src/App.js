import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Profile from './Profile/Profile.js';
import CreatePost from './CreatePost/CreatePost.js';
import Authenticate from './Authenticate/Authenticate.js'
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import { Routes, Route }  from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='header-component'> <Header /></div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/post' element={<CreatePost/>} />
      </Routes>
      <div className='footer-component'> <Footer /></div>
    </div>
  );
}

export default App;
