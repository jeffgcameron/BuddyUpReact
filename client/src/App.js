import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Profile from './Profile/Profile.js';
import CreatePost from './CreatePost/CreatePost.js';
import Feed from './Feed/Feed.js'
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import BuildProfile from './BuildProfile/BuildProfile.js';
import { Routes, Route }  from 'react-router-dom';

function App() {

  const storedID              = localStorage.getItem('id')

  const [userID, setUserID]   = useState(storedID)

  var getUserID = function(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    localStorage.setItem(cookieName, cookie[cookieName])
    setUserID(cookie[cookieName]);
  }

  console.log(typeof userID);

  return (
    <div className="App">
      <div className='header-component'> <Header /></div>
      <Routes>
        <Route path='/login'          element={<Login getUserID={getUserID}/>} />
        <Route path='/home'           element={<Feed userID={userID}/>}/>
        <Route path='/register'       element={<Register getUserID={getUserID}/>} />
        <Route path='/profile'        element={<Profile userID={userID}/>} />
        <Route path='/post'           element={<CreatePost userID={userID}/>} />
        <Route path='/buildprofile'   element={<BuildProfile userID={userID}/>} />
      </Routes>
      <div className='footer-component'> <Footer /></div>
    </div>
  );
}

export default App;
