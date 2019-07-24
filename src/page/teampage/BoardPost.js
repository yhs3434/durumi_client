import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

class BoardPost extends Component {
    state = {
    }

    handleChangeValue = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    handlePostClick = async () => {
        if(Boolean(this.state.title) && Boolean(this.state.content)) {
            let data = this.state;
            if(Boolean(this.props.userObject)) {
                data.userId = this.props.userObject._id;
                data.teamId = this.props.teamSelected;
            }
            const result = await axios.post(`${process.env.REACT_APP_SERVER_URI}/team/board`, data);
            if (result.status === 200) {
                this.props.history.goBack();
            } else {
                this.props.history.goBack();
            }
        }
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            divider: {
                marginTop: '1.5rem',
                marginBottom: '1.5rem'
            },
            textfield: {
                width: "60%"
            }
        }
        return(
            <div style={style.root}>
                <Typography variant="h4">Post your story!</Typography>
                <Divider style={style.divider}/>
                <TextField 
                    label='title'
                    onChange={this.handleChangeValue('title')}
                    value={this.state.title}
                    variant='outlined'
                    style={style.textfield}
                />
                <Divider style={style.divider}/>
                <TextField 
                    label='content'
                    onChange={this.handleChangeValue('content')}
                    value={this.state.content}
                    multiline
                    rows="10"
                    variant='outlined'
                    style={style.textfield}
                />
                <Divider style={style.divider}/>
                <Button onClick={this.handlePostClick} variant='outlined'>Post</Button>
            </div>
        )
    }
}

export default BoardPost;