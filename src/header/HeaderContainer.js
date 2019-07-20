import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import * as accountActions from '../store/modules/account';

class HeaderContainer extends Component {

    render() {
        return (
            <Fragment>
                <Header 
                {...this.props}
                drawerOpen={this.props.drawerOpen} 
                drawerClick={this.props.drawerClick} 
                drawerWidth={this.props.drawerWidth}
                sessionObject={this.props.accountObject}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    accountObject: state.account.object
})

const mapDispatchToProps = (dispatch) => ({
    handleLogout: (payload) => dispatch(accountActions.logout(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);