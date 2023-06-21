import './user.scss';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ProfileAbout from '../../components/ProfileAbout/ProfileAbout.js';
import ProfileActivites from '../../components/ProfileActivites/ProfileActivities.js'
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer.js';

function User() {
    
    var [myActivities, setMyActivities]     = useState([])
    var [myProfile, setMyProfie]            = useState({})

    myActivities.forEach(function(activity){
        if (myProfile.imgURL) {
            activity.imgURL =myProfile.imgURL
        }
        if (myProfile.firstName && myProfile.lastName) {
            activity.userName = myProfile.firstName + ' ' + myProfile.lastName
        }
    })

    const { search }    = useLocation();
    var userID          = search.split('=')[1]

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


    return (
        <article className='root-user'>
            <ProfileAbout myProfile={myProfile}/>
            <hr></hr>
            <ProfileActivites myProfile={myProfile} />
            <hr></hr>
            <h3>{myProfile.firstName}'s Posts</h3>
            {myActivities.map((item) => (
                <ActivityTemplate key={item.id} className="activity" item ={item}/>
		    ))} 
            <div className='footer-component'> <Footer /></div>
        </article>
    )
}
export default User;