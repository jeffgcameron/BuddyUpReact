import './ProfileAbout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import jeffProPic from '../../Images/TallTeton.jpg'

function ProfileAbout({myProfile}) {
    console.log(myProfile);
    // if (myProfile === {}) return
// var profiles = [
//     {
//         name:           'Jeff Cameron',
//         location:       'Jackson, WY',
//         about:          'Hello, my name is Jeff and i am an skier, mountain biker, roller blader and general outdoor enthusiast.'
//     },
//     {
//         name:           'Allie Tattersall',
//         location:       'Jackson, WY',
//         about:          'Hello, I am cute.'
//     },
// ] 

    return (
        <article className='root-profile-about'>
            <img className='profile-picture' src={jeffProPic} alt="Profile"></img>
            <div className='profile-name header-text'>{myProfile.firstName} {myProfile.firstName}</div>
            <div className='profile-location style-text'><FontAwesomeIcon icon={faLocationDot} /> {myProfile.location}</div>
            <div className='profile-bio'>{myProfile.bio}</div>
        </article>
    )
}
export default ProfileAbout;