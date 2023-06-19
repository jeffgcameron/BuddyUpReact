import './ProfileAbout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import jeffProPic from '../../images/TallTeton.jpg'

function ProfileAbout({myProfile}) {
    return (
        <article className='root-profile-about'>
            <img className='profile-picture' src={jeffProPic} alt="Profile"></img>
            <div className='profile-name header-text'>{myProfile.firstName} {myProfile.lastName}</div>
            <div className='profile-location style-text'><FontAwesomeIcon icon={faLocationDot} /> {myProfile.location}</div>
            <div className='profile-bio'>{myProfile.bio}</div>
        </article>
    )
}
export default ProfileAbout;