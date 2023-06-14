import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import Header from './Header/Header.js';
// import Footer from './Footer/Footer.js';
import Profile from './Profile/Profile.js';
import LoginRoute from './LoginRoute.js';
import LoggedOutRoute from './LoggedOutRoute.js';
import CreatePost from './CreatePost/CreatePost.js';
import Feed from './Feed/Feed.js'
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import BuildProfile from './BuildProfile/BuildProfile.js';
import SuccessfulPost from './SuccessfulPost/SuccessfulPost.js';
import { Routes, Route }  from 'react-router-dom';
import Axios from "axios";

function App() {

  
  useEffect(()=> {
    
    var data = {
      token: token
    }
    Axios.post("http://localhost:3001/auth", data).then((response) => {
      setIsLoggedIn(response.data)
      console.log(isLoggedIn);
    })
  }, [])

  const storedID                        = localStorage.getItem('id')
  const storedToken                     = localStorage.getItem('access-token')
  const storedIsLoggedIn                = localStorage.getItem('is-logged-in')
  const [userID, setUserID]             = useState(storedID)
  const [token, setToken]               = useState(storedToken)
  const [isLoggedIn, setIsLoggedIn]     = useState(storedIsLoggedIn === "true")
  const [post, setPost]                 = useState({})
  console.log(post);


  var getCookie = function(action, cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    localStorage.setItem(cookieName, cookie[cookieName])
    action(cookie[cookieName]);
  }

  return (
    <div className="App">
      <div className='header-component'> <Header /></div>
      <Routes>

        <Route path='/login'          
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
                <Login getCookie={getCookie} setUserID={setUserID} setToken={setToken}/>
            </LoginRoute>
          } 
        />

        <Route path='/register'          
          element={
            <LoginRoute isLoggedIn={isLoggedIn}>
                <Register getCookie={getCookie} setUserID={setUserID} setToken={setToken}/>
            </LoginRoute>
          } 
        />

        <Route path='/home'          
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
                <Feed userID={userID}/>
            </LoggedOutRoute>
          } 
        />

        <Route path='/profile'          
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
                <Profile userID={userID}/>
            </LoggedOutRoute>
          } 
        />

        <Route path='/post'          
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
                <CreatePost userID={userID} setPost={setPost}/>
            </LoggedOutRoute>
          } 
        />

        <Route path='/build-profile'          
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
                <BuildProfile userID={userID}/>
            </LoggedOutRoute>
          } 
        />

        <Route path='/success' element={<SuccessfulPost post ={post}/>}/>
      </Routes>
    </div>
  );
}

export default App;
