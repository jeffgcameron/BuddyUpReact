import './save-dialog-box.scss';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import $ from "jquery";
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaveDialogBox({action, item}) {
  const [open, setOpen]             = React.useState(false);
  const [toBeSaved, setToBeSaved]   = React.useState(false);
  const [value, setValue]             = React.useState('');


  const handleClickOpen = (value) => {
    setValue(value)
    var $target			  = $(value.target);
    var $parent 		  = $target.closest('.save-activity');
    var $icon			    = $parent.find('.save-icon');
    var isSaved       = ($icon.hasClass('clicked'))
    setToBeSaved(!isSaved);
    setOpen(true);
  };

  const handleClose = (confirm) => {
    setOpen(false);
    if (confirm === true) {
      action(toBeSaved);
      var $target			  = $(value.target);
      var $icon 		  = $target.closest('.save-activity').find('.save-icon');
      (toBeSaved) ? $icon.addClass('clicked') : $icon.removeClass('clicked')
    }
  };

  return (
    <>
      <Link className='save-activity' onClick={handleClickOpen}>
        <BookmarkIcon className='save-icon' />
      </Link>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          { toBeSaved 
            ? "Save " + item.name 
            : "Unsave " + item.name 
            }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          { toBeSaved 
            ? "Are you sure you want to save " + item.name + "?"
            : "Are you sure you want to unsave " + item.name + "?"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleClose(true)}}>
          { toBeSaved 
            ? "Save"
            : "Unsave"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}