import './delete-dialog-box.scss';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialogBox({action, name}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log('here');
    setOpen(true);
  };

  const handleClose = (confirm) => {
    setOpen(false);
    console.log(confirm);
    if (confirm === true) action()
  };

  return (
    <>
      <Link className='delete-activity' onClick={handleClickOpen}>
        <DeleteForeverIcon/>
      </Link>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete " + name + "?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete {name}? This action is permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleClose(true)}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}