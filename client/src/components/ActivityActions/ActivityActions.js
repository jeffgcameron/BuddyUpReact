import './activity-actions.scss';
import React, {useState} from 'react';
import $ from "jquery";
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function ActivityActions() {
  const [like, setLike] = useState(false)
  

  var showCommentField = function() {

  }

  var likePost = function(value) {
    (like) ? setLike(false) : setLike(true)
    // $likeButton.toggleClass('clicked')
  }

  var savePost = function() {

  }

  return (
    <>
    <ul className="root-activity-actions">
        <li onClick={showCommentField}><AddCommentIcon className='comment-button'></AddCommentIcon></li>
        <li onClick={likePost}><HowToRegIcon className='like-button'></HowToRegIcon></li>
        <li onClick={savePost}><BookmarkIcon/></li>
    </ul>

    </>
  );
}

export default ActivityActions;