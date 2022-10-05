import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import Transition from '../Transition';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: JSX.Element | JSX.Element[] | string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title, children }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;