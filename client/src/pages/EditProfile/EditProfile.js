import './edit-profile.scss';
import React, {useState, useEffect} from 'react';
import TextField  from '@mui/material/TextField/TextField';
import BuildProfileForm from '../../components/BuildProfileForm/BuildProfileForm';
import BuildProfileActivityList from '../../components/BuildProfileActivityList/BuildProfileActivityList';
import Footer from '../../components/Footer/Footer.js';
import {Container , Row, Col} from 'react-bootstrap';
import Axios from 'axios';

function EditProfile({userID}) {

	var [id, setID]            					= useState('')
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
		id:					id,
		imgURL:				imgURL,
		userID:				userID,
		firstName:			firstName,
		lastName:			lastName,
		location:			location,
		activities: 		getList(activities),
		certifications:		getList(certifications),
		bio:				bio,
	}

	var handleSubmit = function(e) {
		e.preventDefault();
		Axios.put('http://localhost:3001/edit-profile', profile)
		window.location.replace('/profile')
	}

	var toggleHelp = function() {
		setShowHelp((showHelp) ? false : true);
	}

	useEffect(() => {
       
        var data = {
            userID:        userID,
          }

        Axios.post('http://localhost:3001/my-profile', data).then((response) => {
            if (response.data.length === 0) { 
                // window.location.replace('/build-profile');
				console.log('edit here');
            } else {
                response.data[0].activities         = response.data[0].activities.split('*&'); 
                response.data[0].certifications     = response.data[0].certifications.split('*&'); 
				setLastName(response.data[0].lastName)
				setFirstName(response.data[0].firstName)
				setLocation(response.data[0].location)
				setImgURL(response.data[0].imgURL)
				response.data[0].activities.forEach(function(activity) {
					addActivity(activity)
				})
				response.data[0].certifications.forEach(function(certification) {
					addCertification(certification)
				})
				setBio(response.data[0].bio)
				setID(response.data[0].id)
            }
        })
      }, [userID])

  return (
	<article>
		<Container className="root-build-profile">

			<h2 className='center-text margin-top'>Edit Your Profile Below!</h2>

			<Row className='margin-top center-text'>
				<Col>
					<TextField  className="full-width" value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" />
				</Col>
				<Col>
					<TextField  className="full-width" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" />
				</Col>
			</Row>

			<div className='margin-top center-text'>
				<TextField id="outlined-basic" value={location}  className="full-width" label="Location" variant="outlined" onChange={e => setLocation(e.target.value)}/>
			</div>
			
			<div className='margin-top center-text'>
				<TextField id="outlined-basic" value={imgURL}  className="full-width" label="Image URL" variant="outlined" onChange={e => setImgURL(e.target.value)}/>
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
				<button className="button" onClick={handleSubmit}>Save</button>
			</div>

		</Container>
		<div className='footer-component'> <Footer /></div>
	</article>
  );
}

export default EditProfile;