import React, {Component, Fragment} from 'react';
import TeamCreateModal from '../components/TeamCreateModal';
import {connect} from 'react-redux';
import axios from 'axios';

class TeamCreateModalContainer extends Component {
    state = {
        sessionObject: {}
    }

    render() {
        return(
            <Fragment>
                <TeamCreateModal 
                sessionObject={this.props.sessionObject}
                modalOpen={this.props.modalOpen}
                modalClick={this.props.modalClick}
                onHistory={this.props.onHistory}
                 />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        sessionObject: state.account.object
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({});
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamCreateModalContainer);