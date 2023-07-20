import './Profile.scss';
import React, {useEffect, useState} from 'react';
import ProfileAbout from '../../components/ProfileAbout/ProfileAbout.js';
import ProfileActivites from '../../components/ProfileActivites/ProfileActivities.js'
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer.js';

function Profile({userID}) {
    
    const [myActivities, setMyActivities]                       = useState([])
    const [myProfile, setMyProfile]                             = useState({})
    const [mySavedActivities, setMySavedActivities] 	        = useState([])
    const [savedActivityDetails, setSavedActivityDetails] 	    = useState([])

    myActivities.forEach(function(activity){
        if (myProfile.imgURL) {
            activity.imgURL = myProfile.imgURL
        }
        if (myProfile.firstName && myProfile.lastName) {
            activity.userName = myProfile.firstName + ' ' + myProfile.lastName
        }
    })

    var getSavedActivityDetail = function(items) {
        mySavedActivities.forEach(function(activity) {
            Axios.post('http://localhost:3001/api/get-activity', {id: activity.activityID}).then((res) => {
                activity.buddies    = res.data[0].buddies
                activity.date       = res.data[0].date
                activity.id         = res.data[0].id
                activity.location   = res.data[0].location
                activity.name       = res.data[0].name
                activity.plan       = res.data[0].plan
                activity.time    = res.data[0].time
                activity.userID     = res.data[0].userID
                setSavedActivityDetails(activity)
            })
        })
    }

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
                setMyProfile(response.data[0])
            }
        })

        Axios.post('http://localhost:3001/api/my-saves', {userID: userID}).then((response) => {
            setMySavedActivities(response.data)
            getSavedActivityDetail(response.data)
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
            {/* <h3>Saved Posts</h3>
            {mySavedActivities.length === 0 
                ? <p className='no-activities'>You Have Not Saved any Activities</p> 
                : ''
            }
            {mySavedActivities.map((item) => (
                <ActivityTemplate key={item.id} className="activity" item={item} removeActivity={removeActivity} getDetail={true}/>
		    ))}  */}
            <div className='footer-component'> <Footer /></div>
        </article>
    )
}
export default Profile;