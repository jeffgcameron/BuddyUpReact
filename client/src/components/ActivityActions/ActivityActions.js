import './activity-actions.scss';
import React, {useState} from 'react';
// import $ from "jquery";
import Axios from "axios";
import AddCommentIcon from '@mui/icons-material/AddComment';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SaveDialogBox from '../SaveDialogBox/SaveDialogBox';
import SignUpDialogBox from '../SignUpDialogBox/SignUpDialogBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialogBox from '../../components/DeleteDialogBox/DeleteDialogBox';
import { Link } from 'react-router-dom';

function ActivityActions({item, signedInUserID, savedActivityID, showEdit, removeActivity, handleSavedOrUnsaved, registeredActivityID, handleRegisterOrUnregister, user}) {
  var showCommentField = function() {

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
        <li onClick={showCommentField}><AddCommentIcon className='comment-button'></AddCommentIcon></li>
        {showEdit ? 
        <>
          
            <li><Link className='link' to={`/edit-post/id?=${item.id}`}><EditIcon /></Link></li>
            <li><DeleteDialogBox deleteActivity={deleteActivity} name={item.name}/></li>
          </>
        : <>
          {/* <li><HowToRegIcon className='like-button' onClick={likePost}></HowToRegIcon></li> */}
          <li><SignUpDialogBox action={determineRegisterorUnregister} item={item} registeredActivityID={registeredActivityID}/></li>
          <li><SaveDialogBox action={determineSaveorUnsave} item={item} savedActivityID={savedActivityID}/></li>
        </>
        }
    </ul>

    </>
  );
}

export default ActivityActions;