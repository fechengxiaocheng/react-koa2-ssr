import React, { Component } from 'react';
import {
    ServerRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import { connect } from 'react-redux';
import Routers from '../router/router';

import NotFound from './404';

/* 
 * Redux
 */
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        state: state
    };
}

// export default connect(
//     mapStateToProps
// )(App);

export default class App extends React.Component {
    render() {
        return (
            <div>
                {
                    Routers.map((route,index) =>(
                        <Route key= { index + 'route-render'} path={ route.path } exact={route.exact?route.exact: false } component={route.component}  />
                    ))
                }
            </div>
        )
    }
}