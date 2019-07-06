import React, {Component, Fragment} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class JoinContent extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_retype: ''
    }

    handleChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        });
    }

    handleButtonClick = async () => {
        const {username, email, password, password_retype} = this.state;
        
        if(password === ''){
            alert('비밀번호를 입력해주세요');
            return;
        }
        if(password !== password_retype){
            alert('비밀번호와 비밀번호재입력이 일치하지 않습니다.');
            return;
        }

        // 추후에 포트넘버 숨겨야 함. 또한 로컬호스트도 바꿔줘야 함.
        try {
            await axios.post('http://localhost:30001/account/join', {
                username, email, password
            });
            
            window.location = "/login"
            
        } catch(e) {
            
        }
    }

    render() {
        const steps = ['Set up your account', 'Choose your tendency', 'Complete'];
        const style = {
            root: {
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            header: {
                title: {
                    marginBottom: '2rem'
                }   
            },
            container: {
                marginTop: '4rem',
                marginBottom: '4rem',
                textAlign: 'center',

                paper: {
                    paddingTop: '2rem',
                    paddingBottom: '2rem'
                },
                box: {
                    marginTop: "2rem",
                    marginBottom: "2rem"
                },
                button: {
                    marginTop: "3rem",
                    marginBottom: "2rem"
                }
            }
        }

        return(
            <div style={style.root}>
                <div className="headerJoin">
                    <div style={style.header.title}>
                        <Container>
                            <Typography variant="h4">Join Durumi</Typography>
                        </Container>
                    </div>
                    <div>
                        <Container>
                            <Stepper>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Container>
                    </div>
                </div>
                <div className="containerJoin" style={style.container}>
                    <Container>
                        <Paper style={style.container.paper}>
                            <Box style={style.container.box}>
                                <TextField label="User name" 
                                onChange={this.handleChange('username')} 
                                value={this.state.username}
                                
                                variant="outlined"/>
                            </Box>
                            <Box style={style.container.box}>
                                <TextField label="Email address" 
                                onChange={this.handleChange('email')} 
                                value={this.state.id}
                                
                                variant="outlined"/>
                            </Box>
                            <Box style={style.container.box}>
                                <TextField label="Password" 
                                onChange={this.handleChange('password')} 
                                value={this.state.password}
                                type="password"
                                variant="outlined"
                                />
                            </Box>
                            <Box style={style.container.box}>
                                <TextField label="Password (retype)" 
                                onChange={this.handleChange('password_retype')} 
                                value={this.state.password_retype}
                                type="password"
                                variant="outlined"
                                />
                            </Box>
                            <Box style={style.container.button}>
                                <Button onClick={this.handleButtonClick} variant="contained" color="primary">Create an account</Button>
                            </Box>
                        </Paper>
                    </Container>
                </div>
            </div>
        )
    }
}

export default JoinContent;