import './Footer.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSquarePlus, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <article className='root-footer'>
			<div className="phantom"></div>
            <Navbar bg="solid" className="main-blue">
                <Container className='justify-content-center'>
        			<Nav>
						<Nav.Link as={Link} to="/home">
							<FontAwesomeIcon icon={faHouse} />
						</Nav.Link>

						<Nav.Link as={Link} to="/post">
							<FontAwesomeIcon icon={faSquarePlus} />
						</Nav.Link>

						<Nav.Link as={Link} to="/profile">
							<FontAwesomeIcon icon={faUserAlt} />
						</Nav.Link>

          			</Nav>
        		</Container>
     		</Navbar>
        </article>
    );
  }
  
  export default Footer;