import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginContent extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (key) => (event) => {
        this.setState({
            [key]: event.target.value
        });
    }

    handleLoginClick = async () => {
        const result = await axios.post(process.env.REACT_APP_SERVER_URI +'/account/login', {
            email: this.state.email,
            password: this.state.password
        });

        if(result.data.length === 0) {
            alert('Login Fail');
            this.setState({
                ...this.state,
                email: '',
                password: ''
            })
        } else {
            console.log('Login Success');
            this.props.onLoginLocal({
                object: result.data[0]
            })
            this.props.onHistory.push('/');
        }
    }

    render() {
        const style = {
            paper: {
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '2rem',
                marginBottom: '2rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            },
            paper2: {
                width: '400px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '2rem',
                marginBottom: '2rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            },
            box: {
                marginTop: "1rem",
                marginBottom: "1rem"
            },
            boxButton: {
                marginTop: "2rem",
                marginBottom: "1rem"
            }
        }

        return(
            <div className="loginContent">
                <Container>
                    <Typography variant="h4">
                        Sign in to Durumi
                    </Typography>
                </Container>
                <Container>
                    <Paper style={style.paper}>
                        <Box style={style.box}>
                            <TextField label="email" 
                            onChange={this.handleChange('email')} 
                            value={this.state.email}
                            variant="outlined"/>
                        </Box>
                        <Box style={style.box}>
                            <TextField label="PASSWORD" 
                            onChange={this.handleChange('password')} 
                            value={this.state.password}
                            type="password"
                            variant="outlined"
                            />
                        </Box>
                        <Box style={style.boxButton}>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.handleLoginClick}>Sign in</Button>
                        </Box>
                    </Paper>
                    <Paper style={style.paper2}>
                        <Box style={style.box}>
                            <Typography>New to Durumi? <Link to="/join">Create an account</Link></Typography>
                        </Box>
                    </Paper>
                </Container>
            </div>
        )
    }
}

export default LoginContent;