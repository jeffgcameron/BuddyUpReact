import './register.scss';
import TextField  from '@mui/material/TextField/TextField';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <article className="root-register">
      <h2>Register</h2>
      <TextField id="outlined-multiline-static" className="margin-bottom" label="Email" />
      <TextField id="outlined-multiline-static" className="margin-bottom" label="Password" />
      <TextField id="outlined-multiline-static" label="Confirm Password" />
      <br></br>
      <button className='button margin-bottom'>Register</button>
      <br></br>
      <Link to="/login">Already Registered? Login Here</Link>
    </article>
  );
}

export default Register;