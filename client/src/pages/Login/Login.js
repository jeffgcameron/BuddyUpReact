import './login.scss';
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

function Login({getCookie, setUserID, setToken}) {

  const [showPassword, setShowPassword]               = React.useState(false);
  const [email, setEmail]                             = React.useState('')
  const [password, setPassword]                       = React.useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  var login = function() {

    var data = {
      email:        email,
      password:     password
    }

      Axios.post("http://localhost:3001/login", data, {withCredentials: true}).then((response) => {

        if (response.data.message) {
          var $error = $('.error');
          $error.removeClass('hidden');
          $error.text(response.data.message);
        } else {
          getCookie(setToken, 'access-token')
          getCookie(setUserID, 'id')
          localStorage.setItem('is-logged-in', 'true')
          window.location.replace('/home')
        }
      })
  };

  return (
    <article className="root-login">

      <Box className="box" component="form" onSubmit={login}>

        <h2 className='margin-bottom'>Login</h2>

        <TextField id="outlined-multiline-static" className="margin-bottom input" label="Email" onChange={(e) => {setEmail(e.target.value)}}/>

        <br></br>

        <FormControl className='input' variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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

        <br></br>

        <button className="button margin-bottom" onClick={()=> {login()}}>Login</button>
        <div className='error hidden'></div>

        <br></br>

        <Link className="link" to="/register">Don't Have an Account? Register Here</Link>

      </Box>

    </article>
  );
}

export default Login;