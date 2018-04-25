import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

// 3.0.0之后需要结构取方法，redux的log中间件
import { createLogger } from 'redux-logger';
import reducer from './reducer/reducer';

import promise from 'redux-promise';

const logger = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(promise, logger)
);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);