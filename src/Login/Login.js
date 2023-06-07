import './login.scss';
import TextField  from '@mui/material/TextField/TextField';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <article className="root-login">
      <h2>Login</h2>
      <TextField id="outlined-multiline-static" className="margin-bottom" label="Email" />
      <TextField id="outlined-multiline-static" className="margin-bottom" label="Password" />
      <br></br>
      <button className="button margin-bottom">Login</button>
      <br></br>
      <Link to="/register">Not Registered? Register Here</Link>
    </article>
  );
}

export default Login;