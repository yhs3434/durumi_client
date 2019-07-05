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
                sessionObject={this.props.object}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    object: state.account.object
})

export default connect(mapStateToProps)(HeaderContainer);