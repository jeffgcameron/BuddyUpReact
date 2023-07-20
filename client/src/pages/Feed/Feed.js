import './feed.scss';
import React, {useState, useEffect} from 'react';
import $ from "jquery";
import SearchBar from '../../components/SearchBar/SearchBar.js';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'
import Footer from '../../components/Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivities] 				= useState([])
  const [signups, setSignups] 						= useState([])
  const [profiles, setProfiles] 					= useState([])
  const [user, setUser] 							= useState({})
  const [mySavedActivities, setMySavedActivities] 	= useState([])
  const [mySignups, setMySignups] 					= useState([])
  const [searchTerm, setSearchTerm] 				= useState('')
  const [filter, setFilter] 						= useState('all')

  console.log(signups)

	activities.forEach(function(activity) {
		activity.signups = [];

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

		mySignups.forEach(function(item) {
			if (activity.id === item.activityID) {
				activity.registeredActivityID = item.id
			}
		})

		signups.forEach(function(signup) {
			if (signup.activityID === activity.id) {
				activity.signups.push(signup) 
				// console.log(signup);
			}
		})
	})
	console.log(activities);

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

	var filterActivities = function(term) {
		setFilter(term)
		$('.filter-actions li').removeClass('filtered')
		$('.filter-actions .' + term).addClass('filtered')
	}

	var handleSavedOrUnsaved = function(id, savedID) {
		console.log(savedID);
			const newList = activities.map((item) => {
				if (item.id === id) {
				  const updatedItem = {
					...item,
					savedActivityID: savedID,
				  };
		  
				  console.log(updatedItem);
				  return updatedItem;
				}
				return item;
			  });
		  
			  setActivities(newList);
	};

	var handleRegisterOrUnregister = function(id, savedID) {
		console.log(savedID);
			const newList = activities.map((item) => {
				if (item.id === id) {
				  const updatedItem = {
					...item,
					registeredActivityID: savedID,
				  };
		  
				  console.log(updatedItem);
				  return updatedItem;
				}
				return item;
			  });
		  
			  setActivities(newList);
	};

  useEffect(() => {

	Axios.get('http://localhost:3001/api/get-activites').then((response) => {
		setActivities(response.data);
	})

	Axios.get('http://localhost:3001/api/get-signups').then((response) => {
		setSignups(response.data);
	})

	Axios.get('http://localhost:3001/api/get-profiles').then((response) => {
		setProfiles(response.data);
	})

	Axios.post('http://localhost:3001/my-profile', {userID: userID}).then((response) => {
		if (response.data.length === 0) {
			// window.location.replace('/build-profile');
		} else {
			setUser(response.data[0])
		}
	})

	Axios.post('http://localhost:3001/api/my-saves', {userID: userID}).then((response) => {
		setMySavedActivities(response.data)
	})

	Axios.post('http://localhost:3001/api/my-signups', {userID: userID}).then((response) => {
		setMySignups(response.data)
	})

  }, [userID])

  return (
    <article className="root-feed">
		<SearchBar setSearchTerm={setSearchTerm}/>
		<ul className='filter-actions'>
			<li className='filtered all'  onClick={()=>{filterActivities('all')}}>
				<div>All</div>
			</li>
			<li className='my' onClick={()=>{filterActivities('my')}}>
				<div>My Activities</div>
			</li>
			<li className='saved' onClick={()=>{filterActivities('saved')}}>
				<div>Saved</div>
			</li>
			<li className='signed' onClick={()=>{filterActivities('signed')}}>
				<div>Registered</div>
			</li>
		</ul>
		<p className="center-text scroll-text header-text">Scroll to View Upcoming Activities!</p>
		<hr></hr>
		{activities.filter((item) => {
			if (searchTerm === '' && filter === 'all'){
				return item
			} else if (filter === 'all' && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'all' && item.location.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'all' && item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'saved' && item.savedActivityID && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'saved' && item.savedActivityID && item.location.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'saved' && item.savedActivityID && item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'my' && item.showEdit && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'my' && item.showEdit && item.location.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'my' && item.showEdit && item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'signed' && item.registeredActivityID && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'signed' && item.registeredActivityID && item.location.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'signed' && item.registeredActivityID && item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			}
		}).map((item) => (
			<ActivityTemplate key={item.id} item={item} signedInUserID={userID} showEdit={item.showEdit} handleRegisterOrUnregister={handleRegisterOrUnregister} showLink={true} removeActivity={removeActivity} handleSavedOrUnsaved={handleSavedOrUnsaved} user={user}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;