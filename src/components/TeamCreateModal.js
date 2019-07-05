import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  textField: {

  },
  divider: {
      margin: '1rem'
  }
}));

export default function TeamCreateModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  const [values, setValues] = React.useState({
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handlePostCreate = async () => {
    const data = {
      profile: {
        name: values.name,
        description: values.description
      },
      hashTag: [...values.hashTag],
      member: [props.sessionObject]
    };

    const result = await axios.post('http://localhost:30001/team/create', data);

    props.modalClick();
    if(result.status === 200) {
        console.log('생성 성공');
        props.onHistory.push('/team');
    } else {
        console.log('생성 실패');
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.modalOpen}
        
      >
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
                Create a team
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                description
            </Typography>
            <Divider className={classes.divider} />
            <TextField 
                label="name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="dense"
                variant="outlined"
            />
            <TextField 
                label="description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="dense"
                variant="outlined"
                multiline
                rowsMax="4"
            />
            <TextField 
                label="hashTag"
                className={classes.textField}
                value={values.hashTag}
                onChange={handleChange('hashTag')}
                margin="dense"
                variant="outlined"
            />
            <TextField 
                label="sessionObj"
                className={classes.textField}
                value={props.sessionObject._id}
                onChange={handleChange('sessionObj')}
                margin="dense"
                variant="outlined"
            />
            <Divider className={classes.divider}/>
            <Button
                onClick={handlePostCreate}
                variant="contained">
                생성
            </Button>
            <Button
                onClick={props.modalClick}
                variant="contained">
                닫기
            </Button>
        </div>
      </Modal>
    </div>
  );
}