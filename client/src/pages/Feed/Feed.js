import './feed.scss';
import React, {useState, useEffect} from 'react';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'
import Footer from '../../components/Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivities] = useState([])
  const [profiles, setProfiles] = useState([])

	activities.forEach(function(activity) {

		if (activity.userID === userID) activity.showEdit = true;

		profiles.forEach(function(profile) {
			if (profile.userID === activity.userID) {
				activity.imgURL 		= profile.imgURL
				activity.userName 		= profile.firstName + ' ' + profile.lastName
			}
		})
	})

	var removeActivity = function(id) {
		setActivities(currentActivities => {
			return (currentActivities.filter(item => item.id !== id))
		})
	};

  useEffect(() => {

	Axios.get('http://localhost:3001/api/get-activites').then((response) => {
		setActivities(response.data);
	})

	Axios.get('http://localhost:3001/api/get-profiles').then((response) => {
		setProfiles(response.data);
	})

	Axios.post('http://localhost:3001/my-profile', {userID: userID}).then((response) => {
		if (response.data.length === 0) window.location.replace('/build-profile');
	})

  }, [userID])

  return (
    <article className="root-feed">
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.map((item) => (
			<ActivityTemplate key={item.id} item={item} signedInUserID={userID} showEdit={item.showEdit} showLink={true} removeActivity={removeActivity}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;