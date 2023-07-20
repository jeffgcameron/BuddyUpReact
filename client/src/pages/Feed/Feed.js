import './feed.scss';
import React, {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'
import Footer from '../../components/Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivities] 				= useState([])
  const [profiles, setProfiles] 					= useState([])
  const [mySavedActivities, setMySavedActivities] 	= useState([])
  const [searchTerm, setSearchTerm] 				= useState('')

	activities.forEach(function(activity) {


		mySavedActivities.forEach(function(activity){

		})

		if (activity.userID === userID) activity.showEdit = true;


		profiles.forEach(function(profile) {
			if (profile.userID === activity.userID) {
				activity.imgURL 		= profile.imgURL
				activity.userName 		= profile.firstName + ' ' + profile.lastName
			}
		})

		mySavedActivities.forEach(function(item) {
			if (activity.id === item.activityID) {
				activity.savedActivityID = item.id
			}
		})
	})

	activities.sort(function(itemOne, itemTwo){
	let x = itemOne.date.toLowerCase();
	let y = itemTwo.date.toLowerCase();
	if (x < y) {return -1;}
	if (x > y) {return 1;}
	if (x === y) {
		let  a = itemOne.time.toLowerCase();
		let b = itemTwo.time.toLowerCase();
		if (a < b) return -1;
		if (a > b) return 1
	}
	return 0;
	});

	var removeActivity = function(id) {
		setActivities(currentActivities => {
			return (currentActivities.filter(item => item.id !== id))
		})
	};

	var showSavedActivities = function() {
		console.log(mySavedActivities);

	}

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

	Axios.post('http://localhost:3001/api/my-saves', {userID: userID}).then((response) => {
		setMySavedActivities(response.data)
		showSavedActivities()
	})



  }, [userID])

  return (
    <article className="root-feed">
		<SearchBar setSearchTerm={setSearchTerm}/>
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.filter((item) => {
			if (searchTerm === ''){
				return item
			} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
			|| item.location.toLowerCase().includes(searchTerm.toLowerCase()) 
			|| item.userName.toLowerCase().includes(searchTerm.toLowerCase())){
				return item
			}
		}).map((item) => (
			<ActivityTemplate key={item.id} item={item} signedInUserID={userID} showEdit={item.showEdit} showLink={true} removeActivity={removeActivity} savedActivityID={item.savedActivityID}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;