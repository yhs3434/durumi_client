import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { EventAvailableTwoTone } from '@material-ui/icons';

class Album extends Component {
    state = {
        path: [],
        fileSelected: {},
        clicked: null
    }

    getImage = async () => {
        const {teamSelected} = this.props;
        const fileList = await axios.get(process.env.REACT_APP_SERVER_URI + "/team/album/" + this.props.teamSelected);
        
        let imgs = [];

        fileList.data.map((file, idx) => {
            const path = `${process.env.REACT_APP_SERVER_URI}/team/${teamSelected}/${file}`;
            imgs.push(path);
        })

        this.setState({
            path: imgs
        })

        return;
    }

    handleClickImg = (event) => {
        this.setState({
            clicked: {
                modal: true,
                path: event.target.id
            }
        });
    }

    handleCloseModal = () => {
        this.setState({
            clicked: null
        });
    }

    handleChangeFile = async (event) => {
        event.preventDefault();

        const fileSelected =event.target.files[0];

        this.setState({
            fileSelected: fileSelected
        });

        if (fileSelected === undefined){
            return;
        }

        let formData = new FormData();
        formData.append('file', fileSelected);
        formData.append('teamId', this.props.teamSelected);
        if(this.props.userObject) {
            formData.append('userId', this.props.userObject._id);
        }

        const url = `${process.env.REACT_APP_SERVER_URI}/team/album/upload`;
        const result = await axios.post(url, formData, {
            progress: (event) => {
                if(event.lengthComputable) {
                    console.log(event.loaded + ' ' + event.total);
                }
            }
        });
    }
    
    componentDidMount() {
        this.getImage();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            header: {
                display: 'flex',
                justifyContent: 'center'
            },
            img: {
                width: '20rem',
                height: '20rem',
            },
            imgButton: {
                margin: '2rem'
            },
            label: {
                padding: '8px 24px'
            },
            uploadButton: {
                padding: 0
            },
            modalImg: {
                
                maxWidth: '80%',
                maxHeight: '80%'
            },
            modalRoot: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
        return(
            <React.Fragment>
                <div>
                    <div style={style.header}>
                        <input type="file" id="fileUpload" name="file" style={{display: 'none'}} onChange={this.handleChangeFile}/>
                        <Button variant="contained" color="primary" size="large" style={style.uploadButton}><label style={style.label} htmlFor="fileUpload">업로드</label></Button>
                    </div>
                    <div id='albumRoot' style={style.root}>
                        {
                            this.state.path.map((path, idx) => {
                                return (
                                    <Button key={idx} style={style.imgButton} onClick={this.handleClickImg}>
                                        <img id={path} src={path} style={style.img}/>
                                    </Button>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <Modal style={style.modalRoot} open={Boolean(this.state.clicked)} onClose={this.handleCloseModal} onClick={this.handleCloseModal}>
                        {
                            Boolean(this.state.clicked)
                            ?
                            <img alt='modalImg' src={this.state.clicked.path} style={style.modalImg}/>
                            :
                            ''
                        }
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default Album;