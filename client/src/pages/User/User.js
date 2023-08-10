import './user.scss';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ProfileAbout from '../../components/ProfileAbout/ProfileAbout.js';
import ProfileActivites from '../../components/ProfileActivites/ProfileActivities.js'
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer.js';

function User({signedInUserID}) {
    
    const [userActivities, setUserActivities]           = useState([])
    const [myProfile, setMyProfie]                      = useState({})
    const [mySavedActivities, setMySavedActivities] 	= useState([])
    const [mySignups, setMySignups] 					= useState([])
    const [signups, setSignups] 						= useState([])
    const [comments, setComments] 					    = useState([])
    const [user, setUser] 							    = useState({})
    const [userID, setUserID] 							= useState('')

    userActivities.forEach(function(activity){
        activity.signups 	= [];
		activity.comments 	= [];

        if (myProfile.imgURL) {
            activity.imgURL = myProfile.imgURL
        }
        if (myProfile.firstName && myProfile.lastName) {
            activity.userName = myProfile.firstName + ' ' + myProfile.lastName
        }

        mySavedActivities.forEach(function(item) {
			if (activity.id === item.activityID) {
				activity.savedActivityID = item.id
			}
		})

		mySignups.forEach(function(item) {
			if (activity.id === item.activityID) {
				activity.registeredActivityID = item.id
			}
		})

        signups.forEach(function(signup) {
			if (signup.activityID === activity.id) {
				activity.signups.push(signup) 
			}
		})

		comments.forEach(function(comment) {
			if (comment.activityID === activity.id) {
				activity.comments.push(comment) 
			}
		})

    })

    var removeComment = function(id) {
		setComments(curentComments => {
			return (curentComments.filter(item => item.id !== id))
		})
	};

    const { search }    = useLocation();
    if (!userID || userID === '')setUserID(search.split('=')[1])

    useEffect(() => {
       
        var data = {
            userID:        userID,
          }

        Axios.post('http://localhost:3001/api/my-activities', data).then((response) => {
            console.log(response);
            setUserActivities(response.data)
        })

        Axios.post('http://localhost:3001/my-profile', data).then((response) => {
            console.log(data)
            if (response.data.length === 0) { 
                window.location.replace('/build-profile');
            } else {
                response.data[0].activities         = response.data[0].activities.split('*&'); 
                response.data[0].certifications     = response.data[0].certifications.split('*&'); 
                setMyProfie(response.data[0])
            }
        })

        Axios.post('http://localhost:3001/api/my-saves', {userID: signedInUserID}).then((response) => {
            setMySavedActivities(response.data)
        })

        Axios.post('http://localhost:3001/api/my-signups', {userID: signedInUserID}).then((response) => {
            setMySignups(response.data)
        })

        Axios.get('http://localhost:3001/api/get-signups').then((response) => {
            setSignups(response.data);
        })

        Axios.get('http://localhost:3001/api/get-comments').then((response) => {
            setComments(response.data);
        })

	Axios.post('http://localhost:3001/my-profile', {userID: signedInUserID}).then((response) => {
		if (response.data.length === 0) {
			window.location.replace('/build-profile');
		} else {
			setUser(response.data[0])
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
            {userActivities.map((item) => (
                <ActivityTemplate key={item.id} className="activity" item ={item} signedInUserID={signedInUserID} user={user} removeComment={removeComment}/>
		    ))} 
            <div className='footer-component'> <Footer /></div>
        </article>
    )
}
export default User;