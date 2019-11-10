import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CancelIcon from "@material-ui/icons/Cancel";

import Avatar from "./Avatar";
import SubmitForm from "./SubmitForm";


/*
  __MOVE THESE TO THE PARENT OF THE MODAL COMPONENT AND PASS THE VALUES__
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = React.useCallback(() => setIsOpen(true), []);
  const handleClose = React.useCallback(() => setIsOpen(false), []);
*/

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    position: "relative"
  },
  title: {
    ...theme.typography.h6
  },
  content: {
    padding: theme.spacing(2, 4),
    ...theme.typography.body1,
  },
  closeIconContainer: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  closeIcon: {
    color: theme.palette.error.main,
    cursor: "pointer"
  }
}))

function Modal(props) {
  const classes = useStyles({ classes: props.classes});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { isOpen, handleClose, userInfo } = props;

  const userId = userInfo && userInfo.id;
  const userAvatarHash = userInfo && userInfo.avatar;
  const userName = userInfo && `${userInfo.username}#${userInfo.discriminator}`;
  
  return (
    <Dialog className={classes.root} onClose={handleClose} open={isOpen} fullScreen={fullScreen}>
      <DialogTitle id="submit-modal-title" className={classes.title}>Submit Solution</DialogTitle>

      <div className={classes.closeIconContainer}>
        <CancelIcon className={classes.closeIcon} onClick={handleClose} />
      </div>

      <div className={classes.content}>
        <Avatar id={userId} avatar={userAvatarHash} userName={userName} />
        <SubmitForm name={userName} handleClose={handleClose} />
      </div>

    </Dialog>
  )
}

export default React.memo(Modal);