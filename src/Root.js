import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
};

export default Root;