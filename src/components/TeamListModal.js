import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  buttons: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '2rem',
      justifyContent: 'space-around',
      marginLeft: '20%',
      marginRight: '20%'
  },
  memberList: {
      display: 'flex',
      flexDirection: 'column',
      margin: '1rem',
      alignItems: 'flex-start'
  },
  chip: {
      margin: '2.5px'
  },
  media: {
      height: '15rem',
  },
  card: {
      marginBottom: '1rem'
  }
}));

export default function TeamListModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.modalOpen}
        onClose={props.modalClose}
      >
        <div style={modalStyle} className={classes.paper}>
            <Card className={classes.card}>
                <CardMedia 
                className={classes.media} 
                image={props.modalObj.profile.thumbnail}
                />
            </Card>
            <Typography variant="h6" id="modal-title">
                {props.modalObj.profile.name}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                {props.modalObj.profile.description}
            </Typography>
            <Divider/>
            <Box className={classes.memberList}>
                <Typography>Member</Typography>
                {props.modalObj.member.map((member, idx) => (
                    <Chip 
                        key={idx}
                        className={classes.chip}
                        variant="outlined"
                        avatar={<Avatar><FaceIcon /></Avatar>} 
                        color="primary"
                        label={member}
                        ></Chip>
                ))}
            </Box>

        <div className={classes.buttons}>
            <Button variant="contained" color="primary">참가</Button>
            <Button variant="contained" color="secondary" onClick={props.modalClose}>닫기</Button>
        </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}