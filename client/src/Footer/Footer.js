import './Footer.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';


function Footer() {


	function deleteAllCookies() {
		const cookies = document.cookie.split(";");

		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf("=");
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}

	var logout = function() {
		window.localStorage.clear();
		deleteAllCookies()
		window.location.replace('/login');
	}

    return (
        <article className='root-footer'>
			<div className="phantom"></div>
            <Navbar bg="solid" className="main-blue">
                <Container className='justify-content-center'>
        			<Nav>
						<Nav.Link as={Link} to="/home">
							<HomeIcon/>
						</Nav.Link>

						<Nav.Link as={Link} to="/post">
							<AddBoxIcon />
						</Nav.Link>

						<Nav.Link as={Link} to="/profile">
							<PersonIcon/>
						</Nav.Link>
						<Nav.Link onClick={logout}>
							<LogoutIcon/>
						</Nav.Link>

          			</Nav>
        		</Container>
     		</Navbar>
        </article>
    );
  }
  
  export default Footer;