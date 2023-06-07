import './Profile.scss';
import ProfileAbout from './ProfileAbout/ProfileAbout.js';
import ProfileActivites from './ProfileActivites/ProfileActivities.js'

function Profile() {

    return (
        <article>
            <ProfileAbout />
            <hr></hr>
            <ProfileActivites />
        </article>
    )
}
export default Profile;