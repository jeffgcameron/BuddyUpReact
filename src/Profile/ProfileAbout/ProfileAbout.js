import './ProfileAbout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import jeffProPic from '../../Images/TallTeton.jpg'

function ProfileAbout() {
var profiles = [
    {
        name:           'Jeff Cameron',
        location:       'Jackson, WY',
        about:          'Hello, my name is Jeff and i am an skier, mountain biker, roller blader and general outdoor enthusiast.'
    },
    {
        name:           'Allie Tattersall',
        location:       'Jackson, WY',
        about:          'Hello, I am cute.'
    },
] 

    return (
        <article className='root-profile-about'>
            <img className='profile-picture' src={jeffProPic} alt="Profile"></img>
            <div className='profile-name'>{profiles[0].name}</div>
            <div className='profile-location'><FontAwesomeIcon icon={faLocationDot} /> {profiles[0].location}</div>
            <div className='profile-bio'>{profiles[0].about}</div>
        </article>
    )
}
export default ProfileAbout;