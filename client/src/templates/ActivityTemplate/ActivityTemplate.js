import './activity-template.scss';
import {Container , Row, Col} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import ActivityActions from '../../components/ActivityActions/ActivityActions.js';
import { Link } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteDialogBox from '../../components/DeleteDialogBox/DeleteDialogBox';
import $ from "jquery"

function ActivityTemplate({item, signedInUserID, showEdit, showLink, removeActivity, handleSavedOrUnsaved, handleRegisterOrUnregister, user}) {

  var toggleDetails = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.activity-plan')
    $detail.toggleClass('hidden');
    ($detail.hasClass('hidden')) ? updateText(true, $target) : updateText(false, $target)
  };
  
  var addComment = function(comment, name, imgURL) {
	console.log(comment);
  }

  var updateText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Plan Details' : 'Hide Plan Details';
	$target.text(text)
  }

  var toggleBuddies = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.registered-buddies')
    $detail.toggleClass('hidden');
    ($detail.hasClass('hidden')) ? updateBuddyText(true, $target) : updateBuddyText(false, $target)
  };

  var updateBuddyText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Registered Buddies' : 'Hide Registered Buddies';
	$target.text(text)
  }

  var toggleComments = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.comment-list')
    $detail.toggleClass('hidden');
    ($detail.hasClass('hidden')) ? updateCommentText(true, $target) : updateCommentText(false, $target)
  };

  var updateCommentText = function(isHidden, $target) {
	var text = (isHidden) ? 'View Comments' : 'Hide Comments';
	$target.text(text)
  }

  var getLink = function() {
	if (signedInUserID === item.userID) return '/profile'
	return `/user/userID?=${item.userID}`
  }

  var getProfileLink = function(profile) {
	console.log('here');
	if (profile.userID === signedInUserID) return '/profile'
	return `/user/userID?=${profile.userID}`
  }

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
					</li>
					{item.signups && item.signups.length > 0 
						? <>
							<li className="view-buddies center-text header-text" onClick={toggleBuddies}>View Registered Buddies</li>
							<li>
								<ul className="hidden center-text registered-buddies">
									{item.signups.map(signup => {
										return (
											<li key={signup.id} className="signup">
												<Link to={getProfileLink(signup)} className="view-profile">
													<Row className="signup">
														<Col xs={1}>
																<div className="align-picture">
																	<img className='signup-picture' src={signup.imgURL} alt="signup"></img>
																</div>
														</Col>
														<Col>
															<div className='signup-name'>{signup.name}</div>
														</Col>
													</Row>
												</Link>
											</li>
									)})}
								</ul>

							</li>
						</>
						: ''
					}

			   </ul>

			   <ActivityActions item={item} signedInUserID={signedInUserID} savedActivityID={item.savedActivityID} showEdit={showEdit} removeActivity={removeActivity} handleSavedOrUnsaved={handleSavedOrUnsaved} handleRegisterOrUnregister={handleRegisterOrUnregister} registeredActivityID={item.registeredActivityID} user={user} addComment={addComment}/>
			   
			   {item.comments && item.comments.length > 0 
						? <>
							<li className="view-buddies center-text header-text" onClick={toggleComments}>View Comments</li>
							<li>
								<ul className="hidden center-text comment-list">
									{item.comments.map(comment => {
										return (
											<li key={comment.id} className="comment">
													<Row className="comment">
														<Col xs={1}>
															<Link to={getProfileLink(comment)} className="view-profile">
																<div className="align-picture">
																	<img className='comment-picture' src={comment.imgURL} alt="comment"></img>
																</div>
															</Link>
														</Col>
														<Col>
															<div className='comment-name'>{comment.name}</div>
															<div className='comment-text'>{comment.comment}</div>
														</Col>
													</Row>
											</li>
									)})}
								</ul>

							</li>
						</>
						: ''
					}
			   <hr></hr>
			</Container>
  );
}

export default ActivityTemplate;