import './Profile.scss';
import React, {useEffect, useState} from 'react';
import ProfileAbout from './ProfileAbout/ProfileAbout.js';
import ProfileActivites from './ProfileActivites/ProfileActivities.js'
import Axios from 'axios';

function Profile({userID}) {
    
    var [myActivities, setMyActivities]     = useState([])
    var [myProfile, setMyProfie]            = useState({})

    useEffect(() => {
       
        var data = {
            userID:        userID,
          }

        Axios.post('http://localhost:3001/api/my-activities', data).then((response) => {
            console.log(response);
            setMyActivities(response.data)
        })

        Axios.post('http://localhost:3001/my-profile', data).then((response) => {
            console.log(response);
            response.data[0].activities = response.data[0].activities.split('*&'); 
            response.data[0].certifications = response.data[0].certifications.split('*&'); 
            setMyProfie(response.data[0])
        })
      }, [userID])

    return (
        <article>
            <ProfileAbout myProfile={myProfile}/>
            <hr></hr>
            <ProfileActivites myProfile={myProfile} />
            <hr></hr>
            <h3>My Activities</h3>
            {myActivities.map((item) => (
                <div key={item.id} className="activity">
                    {item.plan}
                </div>
		))} 
        </article>
    )
}
export default Profile;