import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

class ProfileEditPage extends Component {
    state = {
        init: true
    }

    handleChangeValue = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleButtonClick = async () => {
        const data = this.state;
        const path = `${process.env.REACT_APP_SERVER_URI}/account/edit/profile`;
        let reqData = this.state;
        reqData._id = this.props.sessionObj._id;
        const result = await axios.put(path, reqData);
        console.log(result);
    }

    componentDidUpdate() {
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            childRoot: {
                display: 'inline-flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'center'
            },
            divider: {
                marginTop: '1rem',
                marginBottom: '1rem'
            },
            title: {
                marginTop: '1rem',
                marginBottom: '1.5rem'
            }
        }

        let defaultValue = null;
        if(Boolean(this.props.sessionObj)) {
            defaultValue = this.props.sessionObj;
        }

        return (
            <div style={style.root}>
                <div style={style.childRoot}>
                    <Typography variant="h4" style={style.title}>Edit your profile in here</Typography>
                    <Divider style={style.divider}/>
                    <TextField 
                        id="name"
                        label="name"
                        value={this.state.name}
                        onChange={this.handleChangeValue('name')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.profile.username:''}
                    />
                    <TextField 
                        id="email"
                        label="email"
                        value={this.state.email}
                        onChange={this.handleChangeValue('email')}
                        margin='dense'
                        variant='outlined'
                        InputProps={{
                            readOnly: true,
                        }}
                        defaultValue={defaultValue?defaultValue.email:''}
                    />
                    <Divider style={style.divider}/>
                    <TextField 
                        id="job"
                        label="job or part of team"
                        value={this.state.job}
                        onChange={this.handleChangeValue('job')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.job:''}
                    />
                    <TextField 
                        id="office"
                        label="office"
                        value={this.state.office}
                        onChange={this.handleChangeValue('office')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.office:''}
                    />
                    <TextField 
                        id="school"
                        label="school"
                        value={this.state.school}
                        onChange={this.handleChangeValue('school')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.school:''}
                    />
                    <TextField 
                        id="major"
                        label="major"
                        value={this.state.major}
                        onChange={this.handleChangeValue('major')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.major:''}
                    />
                    <Divider style={style.divider}/>
                    <TextField 
                        id="interest"
                        label="interest"
                        value={this.state.interest}
                        onChange={this.handleChangeValue('interest')}
                        margin='dense'
                        variant='outlined'
                        defaultValue={defaultValue?defaultValue.interest:''}
                    />
                    <Divider style={style.divider}/>
                    <Button variant="contained" color="primary"
                        onClick={this.handleButtonClick}>Confirm</Button>
                </div>
            </div>
        )
    }
}

export default ProfileEditPage;