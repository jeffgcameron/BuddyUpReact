import './ProfileAbout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function ProfileAbout({myProfile}) {

    return (
        <article className='root-profile-about'>
            <img className='profile-picture' src={myProfile.imgURL} alt="Profile"></img>
            <div className='profile-name header-text'>{myProfile.firstName} {myProfile.lastName}</div>
            <div className='profile-location style-text'><FontAwesomeIcon icon={faLocationDot} /> {myProfile.location}</div>
            <div className='profile-bio'>{myProfile.bio}</div>
        </article>
    )
}
export default ProfileAbout;