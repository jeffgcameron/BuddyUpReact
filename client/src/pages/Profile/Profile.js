import './Profile.scss';
import React, {useEffect, useState} from 'react';
import ProfileAbout from '../../components/ProfileAbout/ProfileAbout.js';
import ProfileActivites from '../../components/ProfileActivites/ProfileActivities.js'
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer.js';

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
            if (response.data.length === 0) { 
                window.location.replace('/build-profile');
            } else {
                response.data[0].activities         = response.data[0].activities.split('*&'); 
                response.data[0].certifications     = response.data[0].certifications.split('*&'); 
                setMyProfie(response.data[0])
            }
        })
      }, [userID])

      console.log(myProfile);

    return (
        <article className='root-profile'>
            <ProfileAbout myProfile={myProfile}/>
            <hr></hr>
            <ProfileActivites myProfile={myProfile} />
            <hr></hr>
            <h3>My Posts</h3>
            {myActivities.map((item) => (
                <ActivityTemplate key={item.id} className="activity" item ={item}/>
		    ))} 
            <div className='footer-component'> <Footer /></div>
        </article>
    )
}
export default Profile;