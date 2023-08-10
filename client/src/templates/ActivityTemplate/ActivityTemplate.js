import './activity-template.scss';
import {Container , Row, Col} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import Axios from "axios";
import ActivityActions from '../../components/ActivityActions/ActivityActions.js';
import DeleteDialogBox from '../../components/DeleteDialogBox/DeleteDialogBox';
import { Link } from 'react-router-dom';
import $ from "jquery"

function ActivityTemplate({item, signedInUserID, showEdit, showLink, removeActivity, removeComment, handleSavedOrUnsaved, handleRegisterOrUnregister, user}) {

  var toggleDetails = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.activity-plan')
    $detail.toggleClass('hidden');
    ($detail.hasClass('hidden')) ? updateText(true, $target) : updateText(false, $target)
  };
  
  var addComment = function(comment, name, id, imgURL, $parent) {
	var $commentToggle 		= $parent.find('.view-comments')
	var $commentList 		= $parent.find('.comment-list')
	var $button				= "<div class='delete-comment col-1'> <a class='delete-activity' onClick='" + deleteComment(id) + "'> <svg class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='DeleteForeverIcon'><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'></path></svg></a></div>"
	// todo allow for delete 
	var $picture 			= "<div class='align-picture'><img class='comment-picture' src='" + imgURL+ "' alt='" + comment + "'></img></div>"
	var $name  				= "<div class='comment-name'>" + name + "</div>"
	var $comment  			= "<div class='comment-text'>" + comment + "</div>"
	var text 				= "<li key=" + id + "><div class='comment row'><div class='col-1'>" + $picture + "</div><div class='col'>" + $name + $comment + "</div>" + $button + "</div></li>" 
	$commentList.hasClass('hidden') ? $commentToggle.text("View Comments") : $commentToggle.text("Hide Comments") 
	$commentList.append(text)
  }

  var deleteComment = function(id) {
	Axios.delete('http://localhost:3001/api/delete-comment', { data: {id: id}})
	removeComment(id)
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
							<li className="view-comments center-text header-text" onClick={toggleComments}>View Comments</li>
							<li>
								<ul className="hidden center-text comment-list">
									{item.comments.map(comment => {
										return (
											<li key={comment.id}>
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
														{comment.userID === signedInUserID
														? <Col xs={1} className='delete-comment'>
															<DeleteDialogBox action={() => deleteComment(comment.id)} name={'your comment'}/>
														</Col>
														: ''
														}
													</Row>
											</li>
									)})}
								</ul>

							</li>
						</>
						: <>
						<li className="view-comments center-text header-text" onClick={toggleComments}></li>
						<ul className="center-text comment-list"></ul>
						</>
					}
			   <hr></hr>
			</Container>
  );
}

export default ActivityTemplate;