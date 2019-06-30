import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Header from './Header';

class HeaderContainer extends Component {
    render() {
        return (
            <Fragment>
                <Header 
                drawerOpen={this.props.drawerOpen} 
                drawerClick={this.props.drawerClick} 
                drawerWidth={this.props.drawerWidth}
                sessionId={this.props.durumiId}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    durumiId: state.account.durumiId
})

export default connect(mapStateToProps)(HeaderContainer);