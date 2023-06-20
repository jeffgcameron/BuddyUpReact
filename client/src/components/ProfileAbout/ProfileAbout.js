import './ProfileAbout.scss';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import EditIcon from '@mui/icons-material/Edit';

function ProfileAbout({myProfile, showEdit}) {
    return (
        <article className='root-profile-about'>

            <img className='profile-picture' src={myProfile.imgURL} alt="Profile"></img>
            <div className='profile-name header-text'>{myProfile.firstName} {myProfile.lastName} {showEdit 
				? 
				<Link className='link' to="/edit-profile"><EditIcon /></Link>
				: ''
				}
            </div>
            <div className='profile-location style-text'><FontAwesomeIcon icon={faLocationDot} /> {myProfile.location}</div>
            <div className='profile-bio'>{myProfile.bio}</div>
        </article>
    )
}
export default ProfileAbout;