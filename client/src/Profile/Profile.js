import './Profile.scss';
import React, {useEffect} from 'react';
import ProfileAbout from './ProfileAbout/ProfileAbout.js';
import ProfileActivites from './ProfileActivites/ProfileActivities.js'
import Axios from 'axios';

function Profile() {

    // useEffect(() => {
    //     Axios.get('http://localhost:3001/profile', function(req, res){}).then((response) => {
    //         console.log(response)
    //     }).catch((e) => {
    //         console.log(e);
    //       })
    // })

    return (
        <article>
            <ProfileAbout />
            <hr></hr>
            <ProfileActivites />
        </article>
    )
}
export default Profile;