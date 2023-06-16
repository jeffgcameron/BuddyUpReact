import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header.js';
import Profile from './pages/Profile/Profile.js';
import LoginRoute from './routes/LoginRoute.js.js';
import LoggedOutRoute from './routes/LoggedOutRoute.js';
import CreatePost from './pages/CreatePost/CreatePost.js';
import Feed from './pages/Feed/Feed'
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import BuildProfile from './pages/BuildProfile/BuildProfile.js';
import SuccessfulPost from './pages/SuccessfulPost/SuccessfulPost.js';
import { Routes, Route }  from 'react-router-dom';
import Axios from "axios";

function App() {

  const storedID                        = localStorage.getItem('id')
  const storedToken                     = localStorage.getItem('access-token')
  const storedIsLoggedIn                = localStorage.getItem('is-logged-in')
  const [userID, setUserID]             = useState(storedID)
  const [token, setToken]               = useState(storedToken)
  const [isLoggedIn, setIsLoggedIn]     = useState(storedIsLoggedIn === "true")
  const [post, setPost]                 = useState({})
  
  useEffect(()=> {
    
    var data = {
      token: token
    }

    Axios.post("http://localhost:3001/auth", data).then((response) => {
      setIsLoggedIn(response.data)
    })

  })

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

        <Route exact path='/'          
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
            // <LoggedOutRoute isLoggedIn={isLoggedIn}>
                <BuildProfile userID={userID}/>
            // </LoggedOutRoute>
          } 
        />

        <Route path='/success' element={<SuccessfulPost post ={post}/>}/>
      </Routes>
    </div>
  );
}

export default App;
