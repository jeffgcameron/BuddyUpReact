import './activity-template.scss';
import {Container , Row, Col} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import ActivityActions from '../../components/ActivityActions/ActivityActions.js';
import { Link } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteDialogBox from '../../components/DeleteDialogBox/DeleteDialogBox';
import $ from "jquery"

function ActivityTemplate({item, signedInUserID, showEdit, showLink, removeActivity, handleSavedOrUnsaved}) {

  var toggleDetails = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.activity-plan')
    $detail.toggleClass('hidden');
    ($detail.hasClass('hidden')) ? updateText(true, $target) : updateText(false, $target)
  };

  var updateText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Plan Details' : 'Hide Plan Details';
	$target.text(text)
  }

  var getLink = function() {
	if (signedInUserID === item.userID) return '/profile'
	return `/user/userID?=${item.userID}`
  }

//   useEffect(() => {
// 	if (getDetail) {
// 		Axios.post('http://localhost:3001/api/get-activity', {id: item.activityID}).then((res) => {
// 			item.buddies    = res.data[0].buddies
// 			item.date       = res.data[0].date
// 			item.id         = res.data[0].id
// 			item.location   = res.data[0].location
// 			item.name       = res.data[0].name
// 			item.plan       = res.data[0].plan
// 			item.time    	= res.data[0].time
// 			item.userID     = res.data[0].userID
// 			setsavedActivity(item)
// 		})
// 	}
//   })

  return (
    <Container key={item.id} className="root-activity-template activity">
				<ul>

					<Row>
						<Col xs={4} className="vertical-justify">

							{showLink 
								? <Link to={getLink()} className="view-profile">

									<li className="align-picture">
										<img className='profile-picture' src={item.imgURL} alt="Profile"></img>
									</li>
									
									<li className='center-text header-text'>{item.userName}</li>
									

								</Link>
								: <>
									<li className="align-picture">
									<img className='profile-picture' src={item.imgURL} alt="Profile"></img>
									</li>
								
									<li className='center-text header-text'>{item.userName}</li>
								</>
							}
							

						</Col>

						<Col xs={8} className="vertical-justify">

							<li>Activity: <span>{item.name}</span></li>
							
							<li>Date: <span>{item.date}</span></li>

							<li>Time: <span>{item.time}</span></li>
							
							<li>Meeting: <span>{item.location}</span></li>
							
							<li>Buddies: <span>{item.buddies}</span></li>
						
						</Col>

					</Row>

					<li className="view-plan center-text header-text" onClick={toggleDetails}>View Plan Details</li>

					<li className="hidden center-text activity-plan">
						<div>{item.plan}</div>
						{/* {showEdit ? 
								<div className='actions'> 
									<Link className='link' to={`/edit-post/id?=${item.id}`}><EditIcon /></Link>
									<DeleteDialogBox deleteActivity={deleteActivity} name={item.name}/>
								</div>
							: ''} */}
					</li>

			   </ul>
			   <ActivityActions item={item} signedInUserID={signedInUserID} savedActivityID={item.savedActivityID} showEdit={showEdit} removeActivity={removeActivity} handleSavedOrUnsaved={handleSavedOrUnsaved}/>
			   
			   <hr></hr>
			</Container>
  );
}

export default ActivityTemplate;