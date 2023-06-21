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

    myActivities.forEach(function(activity){
        if (myProfile.imgURL) {
            activity.imgURL =myProfile.imgURL
        }
        if (myProfile.firstName && myProfile.lastName) {
            activity.userName = myProfile.firstName + ' ' + myProfile.lastName
        }
    })


	var removeActivity = function(id) {
		setMyActivities(currentActivities => {
			return (currentActivities.filter(item => item.id !== id))
		})
	};

    useEffect(() => {
       
        var data = {
            userID:        userID,
          }

        Axios.post('http://localhost:3001/api/my-activities', data).then((response) => {
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
        <article className='root-profile'>
            <ProfileAbout myProfile={myProfile} showEdit={true}/>
            <hr></hr>
            <ProfileActivites myProfile={myProfile} />
            <hr></hr>
            <h3>My Posts</h3>
            {myActivities.length === 0 
                ? <p className='no-activities'>You Have Not Created any Activities</p> 
                : ''
            }
            {myActivities.map((item) => (
                <ActivityTemplate key={item.id} className="activity" item={item} showEdit={true} removeActivity={removeActivity}/>
		    ))} 
            <div className='footer-component'> <Footer /></div>
        </article>
    )
}
export default Profile;