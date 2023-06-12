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

function Register() {

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
      email:        email,
      password:     password
    }
     
    Axios.post("http://localhost:3001/register", data).then((response) => {
      if (response.data.err) {
        showError('This email already exists. Please sign in.')
      }
    }).catch((e) => {
      console.log(e);
    })

  }

  return (
    <article className="root-register">

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

      <Link to="/login">Already Registered? Login Here</Link>

    </article>
  );
}

export default Register;