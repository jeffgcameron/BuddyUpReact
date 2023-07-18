import './activity-actions.scss';
import React, {useState} from 'react';
// import $ from "jquery";
import Axios from "axios";
import AddCommentIcon from '@mui/icons-material/AddComment';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SaveDialogBox from '../SaveDialogBox/SaveDialogBox';

function ActivityActions(item, signedInUserID) {
  const [like, setLike] = useState(false)

  var showCommentField = function() {

  }

  var determineSaveorUnsave = function(shouldSave) {
    
    var savePost = function() {

      var data = {
        id:           signedInUserID,
      }

      Axios.post('http://localhost:3001/api/saves', data)
      console.log('saving');
    };
    
    var unsavePost = function() {
      console.log('unsave');
    };

    (shouldSave) ? savePost() : unsavePost()

  };

  var likePost = function(value) {
    (like) ? setLike(false) : setLike(true)
    // $likeButton.toggleClass('clicked')
  }

  return (
    <>
    <ul className="root-activity-actions">
        <li onClick={showCommentField}><AddCommentIcon className='comment-button'></AddCommentIcon></li>
        <li><HowToRegIcon className='like-button' onClick={likePost}></HowToRegIcon></li>
        <li><SaveDialogBox action={determineSaveorUnsave} item={item.item}/></li>
    </ul>

    </>
  );
}

export default ActivityActions;