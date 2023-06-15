import './build-profile.scss';
import React, {useState} from 'react';
import $ from "jquery"
import TextField  from '@mui/material/TextField/TextField';
import BuildProfileForm from '../../components/BuildProfileForm/BuildProfileForm';
import BuildProfileActivityList from '../../components/BuildProfileActivityList/BuildProfileActivityList';
import {Container , Row, Col} from 'react-bootstrap';
import Axios from 'axios';

function BuildProfile({userID}) {

	const [activities, setActivities]		 	= useState([]);
	const [certifications, setCertifications]	= useState([]);
	const [bio, setBio] 						= useState('');
	const [location, setLocation] 				= useState('');
	const [imgURL, setImgURL] 					= useState('');
	const [firstName, setFirstName] 			= useState('');
	const [lastName, setLastName] 				= useState('');
	const [showHelp, setShowHelp] 				= useState(false);

	var addActivity = function(title) {
		setActivities(newActivities => {
			return [
				...newActivities, {id: crypto.randomUUID(), title}
			]
		})
	}

	var addCertification = function(title) {
		setCertifications(newCertifications => {
			return [
				...newCertifications, {id: crypto.randomUUID(), title}
			]
		})
	}

	var deleteActivity = function(id) {
		setActivities(currentActivities => {
			return (currentActivities.filter(item => item.id !== id))
		})
	};

	var deleteCertification= function(id) {
		setCertifications(currentCertifications => {
			return (currentCertifications.filter(item => item.id !== id))
		})
	};

	var getList = function(array) {
		var list = []
		array.forEach(function(item) {
			list.push(item.title)
		})
		return list.join('*&');
	}

	var profile = {
		id:					crypto.randomUUID(),
		imgURL:				imgURL,
		userID:				userID,
		firstName:			firstName,
		lastName:			lastName,
		location:			location,
		activities: 		getList(activities),
		certifications:		getList(certifications),
		bio:				bio,
	}

	console.log(profile)

	var handleSubmit = function(e) {
		e.preventDefault();
		Axios.post('http://localhost:3001/build-profile', profile)
		window.location.replace('/home')
	}

	var toggleHelp = function() {
		setShowHelp((showHelp) ? false : true);
	}

  return (
	<Container className="root-build-profile">

		<h2 className='center-text margin-top'>Fill Out Form to Complete Your Profile!</h2>

		<Row className='margin-top center-text'>
			<Col>
				<TextField  className="full-width" value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" />
			</Col>
			<Col>
				<TextField  className="full-width" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" />
			</Col>
		</Row>

		<div className='margin-top center-text'>
			<TextField id="outlined-basic"  className="full-width" label="Location" variant="outlined" onChange={e => setLocation(e.target.value)}/>
		</div>
		
		<div className='margin-top center-text'>
			<TextField id="outlined-basic"  className="full-width" label="Image URL" variant="outlined" onChange={e => setImgURL(e.target.value)}/>
			{showHelp 
			? 	<>
					<div className='show-help' onClick={toggleHelp}>Hide Help</div> 
					<div className='help center-text'>Right click on any web image and select "Copy Image Address". Paste into input box above.</div>
				</>
			: <div className='show-help' onClick={toggleHelp}>Show Help</div>
			}
		</div>

		<div className='margin-top center-text'>
			<TextField className='full-width' value={bio} multiline rows={4} onChange={e => setBio(e.target.value)} label="Bio" />
		</div>

		<Row className='margin-top center-text'>
			<Col>
				<BuildProfileForm  className="full-width" addItem={addActivity} AddItemLabel = "Add Activities"/>
			</Col>
			<Col>
				<BuildProfileForm  className="full-width" addItem={addCertification} AddItemLabel = "Add Certs"/>
			</Col>
		</Row>

		<Row>
			<Col>
				<BuildProfileActivityList deleteItem={deleteActivity} items={activities}/>
			</Col>
			<Col>
				<BuildProfileActivityList deleteItem={deleteCertification} items={certifications}/>
			</Col>
		</Row>

		<div className='center-text'>
			<button className="button" onClick={handleSubmit}>Create Profile</button>
		</div>

	</Container>
  );
}

export default BuildProfile;