import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class Album extends Component {
    state = {
        path: [],
        fileSelected: {}
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
        /*
        this.getImage().then((result) => {
            const parentElem = document.getElementById('albumRoot');
            result.map((elem, idx) => {
                let newElem = React.createElement("img", {src: elem, style: "width: 20rem; height: 20rem; margin: 1rem;"});
                //newElem.innerHTML = `<img src=${elem} style="width: 20rem; height: 20rem; margin: 1rem;"/>`;
                console.log(newElem);
            })
        })
        */
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState !== this.state){
            this.getImage();
        }
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
            }
        }
        return(
            <div>
                <div style={style.header}>
                    <input type="file" id="fileUpload" name="file" style={{display: 'none'}} onChange={this.handleChangeFile}/>
                    <Button variant="contained" color="primary" size="large" style={style.uploadButton}><label style={style.label} htmlFor="fileUpload">업로드</label></Button>
                </div>
                <div id='albumRoot' style={style.root}>
                    {
                        this.state.path.map((path, idx) => {
                            return (
                                <Button key={idx} style={style.imgButton}>
                                    <img src={path} style={style.img}/>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Album;