import React, {Component} from 'react';
import LoginContent from '../contents/LoginContent';
import {connect} from 'react-redux';
import * as accountActions from '../store/modules/account';

class LoginContainer extends Component {
    handleLoginLocal = (payload) => {
        this.props.loginLocal(payload);
    }

    componentDidMount() {
        console.log('here');   
    }

    render() {
        return(
            <LoginContent 
            onLoginLocal={this.handleLoginLocal}
            onHistory={this.props.history}
            onLocation={this.props.location}
            >
            </LoginContent>
        )
    }
}

const mapStateToProps = (state) => ({
    durumiId: state.account.durumiId
});

const mapDispatchToProps = (dispatch) => ({
    loginLocal: (payload) => dispatch(accountActions.loginLocal(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);