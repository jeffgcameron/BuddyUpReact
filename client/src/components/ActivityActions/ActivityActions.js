import './activity-actions.scss';
import React, {useState} from 'react';
// import $ from "jquery";
import Axios from "axios";
import AddCommentIcon from '@mui/icons-material/AddComment';
import TextField from '@mui/material/TextField';
import SaveDialogBox from '../SaveDialogBox/SaveDialogBox';
import SignUpDialogBox from '../SignUpDialogBox/SignUpDialogBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialogBox from '../../components/DeleteDialogBox/DeleteDialogBox';
import { Link } from 'react-router-dom';
import $ from "jquery"

function ActivityActions({item, signedInUserID, savedActivityID, showEdit, removeActivity, handleSavedOrUnsaved, registeredActivityID, handleRegisterOrUnregister, user, addComment}) {

  const [comment, setComment] = useState('')

  var toggleComments = function(value) {
    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $detail			= $parent.find('.comment-section')
    var $button			= $parent.find('.comment-button')
    $detail.toggleClass('hidden');
    $button.toggleClass('clicked')
  };

  var postComment = function(value) {

    var $target			= $(value.target)
    var $parent 		= $target.closest('.activity')
    var $warning		= $parent.find('.comment-warning')
    var $button			= $parent.find('.comment-button')
    var $detail			= $parent.find('.comment-section')
    var $input			= $parent.find('input');
    const d         = new Date();
    let time        = d.getTime();

    var savePost = function() {
      var data = {
        id:           crypto.randomUUID(),
        userID:       signedInUserID,
        activityID:   item.id,
        comment:      comment,
        name:         user.firstName + ' ' + user.lastName,
        imgURL:       user.imgURL,
        time:         time     
      }
      console.log(data);

      Axios.post('http://localhost:3001/save-comment', data)

      addComment(comment, data.name, data.id, data.imgURL, $parent)
      resetStyles()
    }

    var resetStyles = function() {
      $detail.addClass( 'hidden')
      $warning.addClass('hidden')
      $button.removeClass('clicked')
      $input[0].value = ''
      setComment('');
    }

    if (comment.length < 2) {
      $warning.removeClass('hidden')
      return;
    }

    savePost()
  }

  var determineSaveorUnsave = function(shouldSave) {
    
    var savePost = function() {
      var data = {
        id:           crypto.randomUUID(),
        userID:       signedInUserID,
        activityID:   item.id
      }

      Axios.post('http://localhost:3001/save-activity', data)
      console.log('saving');
      handleSavedOrUnsaved(item.id, data.id)
    };
    
    var unsavePost = function() {
      Axios.delete('http://localhost:3001/api/delete-save', { data: {id: savedActivityID}})
      handleSavedOrUnsaved(item.id, false)
    };

    (shouldSave) ? savePost() : unsavePost()

  };

  var determineRegisterorUnregister = function(shouldSave) {
    
    var savePost = function() {
      var data = {
        id:           crypto.randomUUID(),
        userID:       signedInUserID,
        activityID:   item.id,
        name:         user.firstName + ' ' + user.lastName,
        imgURL:       user.imgURL
      }

      Axios.post('http://localhost:3001/signup-activity', data)
      console.log('saving');
      handleRegisterOrUnregister(item.id, data.id)
    };
    
    var unsavePost = function() {
      Axios.delete('http://localhost:3001/api/delete-signup', { data: {id: registeredActivityID}})
      handleRegisterOrUnregister(item.id, false)
    };

    (shouldSave) ? savePost() : unsavePost()

  };

  var deleteActivity = function() {
    Axios.delete('http://localhost:3001/api/delete-activity', { data: {id: item.id}})
    removeActivity(item.id)
    }

  return (
    <>
      <ul className="root-activity-actions">
          <li onClick={toggleComments}><AddCommentIcon className='comment-button'></AddCommentIcon></li>
          {showEdit ? 
          <>
            
              <li><Link className='link' to={`/edit-post/id?=${item.id}`}><EditIcon /></Link></li>
              <li><DeleteDialogBox action={deleteActivity} name={item.name}/></li>
            </>
          : <>
            <li><SignUpDialogBox action={determineRegisterorUnregister} item={item} registeredActivityID={registeredActivityID}/></li>
            <li><SaveDialogBox action={determineSaveorUnsave} item={item} savedActivityID={savedActivityID}/></li>
          </>
          }
      </ul>
      <div className='comment-section hidden'>
        <TextField className='comment-box' id="outlined-basic" label="Add Comment" variant="outlined" onChange={e => setComment(e.target.value)}/>
        <p className='post-comment' onClick={postComment}>Post</p>
      </div>
      <div className='comment-warning error center-text hidden'>Comment must be at least 2 characters long</div>
    </>
  );
}

export default ActivityActions;