import React, {Component} from 'react';
import axios from 'axios';
import MyTeamCard from '../components/MyTeamCard';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import * as teamActions from '../store/modules/team';
import { connect } from 'react-redux';

class MyTeamContent extends Component {
    state = {
        myTeamList: [],
        teamSelected: null
    }

    handleSelectTeam = (team) => {
        this.setState({
            selectedTeam: team
        })
        this.props.selectTeam({
            teamSelected: team
        })
        this.props.history.push('/enter');
    }

    getMyTeam = async (flag) => {
        if (flag===true){
            const myTeamList = await axios.get(process.env.REACT_APP_SERVER_URI + "/team/my/"+this.props.sessionObj._id);
            if (myTeamList.status === 200){
                return myTeamList.data;
            }
            else{
                return [];
            }
        }
        else {
            return [];
        }
    }
    
    componentDidMount() {
        const result = this.getMyTeam(Boolean(this.props.sessionObj));
        result.then((res)=>{
            this.setState({
                myTeamList: [...this.state.myTeamList, ...res]
            });
        }).catch((e)=>{console.log('MyTeamContent.js', e)})
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
            },
            item: {
                margin: '2rem'
            }
        }

        return (
            <Container>
                <div style={style.root}>
                    {this.state.myTeamList.map((team, idx) => (
                        <Box style={style.item}>
                            <MyTeamCard team={team} onSelect={this.handleSelectTeam} />
                        </Box>
                    )
                    )}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        teamSelected: state.team.teamSelected
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        selectTeam: (payload) => dispatch(teamActions.selectTeam(payload))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamContent);