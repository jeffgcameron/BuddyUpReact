import './register.scss';
import * as React from 'react';
import TextField  from '@mui/material/TextField/TextField';
import Axios from "axios";
import $ from "jquery";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';

function Register({getCookie, setUserID, setToken}) {

  const [showPassword, setShowPassword]               = React.useState(false);
  const [email, setEmail]                             = React.useState('')
  const [password, setPassword]                       = React.useState('')
  const [confirmPassword, setConfirmPassword]         = React.useState('')

  const handleClickShowPassword         = () => setShowPassword((show) => !show);

  const handleMouseDownPassword         = (event) => {
    event.preventDefault();
  };

  var showError = function(text){
    var $error = $('.error')
    $error.removeClass('hidden');
    $error.text(text);
  }

  var login = function(data) {

      Axios.post("http://localhost:3001/login", data, {withCredentials: true}).then((response) => {

        if (response.data.message) {
          var $error = $('.error');
          $error.removeClass('hidden');
          $error.text(response.data.message);
        } else {
          getCookie(setToken, 'access-token')
          getCookie(setUserID, 'id')
          localStorage.setItem('is-logged-in', 'true')
          window.location.replace('/build-profile')
        }
      })
  }

  var register = function() {

    var passwordsMatch = function() {

      if (password !== confirmPassword) {
        showError('Passwords dont match');
        return false;
      }

      return true;
    }

    var passwordLengthIsValid = function() {

      if (password.length === 0) {
        showError('Password must contain a value');
        return false;
      }

      return true;
    }

    var emailIsEmail = function() {

      if (email.length === 0) {
        showError('Please enter valid email');
        return false;
      }

      return true;
    }
    
    if (!emailIsEmail())              return;
    if (!passwordsMatch())            return;
    if (!passwordLengthIsValid())     return;
    // $error.addClass('hidden')

    var data = {
      id:           crypto.randomUUID(),
      email:        email,
      password:     password
    }
     
    Axios.post("http://localhost:3001/register", data).then((response) => {
      console.log(response)
      if (response.data.err) {
        showError('This email already exists. Please sign in.')
      } else {
        login(data)
      }
    }).catch((e) => {
      console.log(e);
    })

  }

  return (
    <article className="root-register">

      <Box className="box" component="form" onSubmit={login}>


        <h2>Register</h2>

        <TextField id="outlined-multiline-static" className="margin-bottom input" label="Email" onChange={(e) => {setEmail(e.target.value)}}/>

        <FormControl className='input margin-bottom' variant="outlined" >
            <InputLabel htmlFor="create-password">Password</InputLabel>
            <OutlinedInput
              id="create-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {setPassword(e.target.value)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
        </FormControl>
        
        <FormControl className='input margin-bottom' variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
        </FormControl>


        <br></br>

        <button className='button margin-bottom' onClick={() => {register()}}>Register</button>

        <div className='error hidden'></div>

        <br></br>

        <Link className="link" to="/login">Already Registered? Login Here</Link>
      </Box>

    </article>
  );
}

export default Register;