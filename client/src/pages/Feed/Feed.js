import './feed.scss';
import React, {useState, useEffect} from 'react';
import $ from "jquery";
import SearchBar from '../../components/SearchBar/SearchBar.js';
import ActivityTemplate from '../../templates/ActivityTemplate/ActivityTemplate.js'
import Footer from '../../components/Footer/Footer.js';
import Axios from 'axios';

function Feed({userID}) {

  const [activities, setActivities] 				= useState([])
  const [profiles, setProfiles] 					= useState([])
  const [mySavedActivities, setMySavedActivities] 	= useState([])
  const [searchTerm, setSearchTerm] 				= useState('')
  const [filter, setFilter] 						= useState('all')
  console.log(filter);

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
				<div>Signed Up</div>
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
			} else if (filter === 'signed' && item.signedUp && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'signed' && item.signedUp && item.location.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			} else if (filter === 'signed' && item.signedUp && item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ){
				return item
			}
			// } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
			// || item.location.toLowerCase().includes(searchTerm.toLowerCase()) 
			// || item.userName.toLowerCase().includes(searchTerm.toLowerCase())){
			// 	return item
			// }
		}).map((item) => (
			<ActivityTemplate key={item.id} item={item} signedInUserID={userID} showEdit={item.showEdit} showLink={true} removeActivity={removeActivity} savedActivityID={item.savedActivityID} handleSavedOrUnsaved={handleSavedOrUnsaved}/>
		))} 

		<div className='footer-component'> <Footer /></div>
    </article>
  );
}

export default Feed;