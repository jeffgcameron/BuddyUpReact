import './Header.scss';
import logo from '../../images/BU.png';

function Header() {
    return (
        <header className='main-blue'>
            <img className="logo-header" src={logo} alt="Logo"></img>
        </header>
    );
  }
  
  export default Header;