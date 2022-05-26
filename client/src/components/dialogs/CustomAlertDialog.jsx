import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CustomAlertDialog = (props) => {
  const { open, setOpen, dialogMessage, buttons, dialogTitleIcon } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ display: 'flex', float: 'right' }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        {dialogTitleIcon}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button) => (
          <div key={Math.random()}>{button}</div>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlertDialog;
