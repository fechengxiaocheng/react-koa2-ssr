import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addTitle, saveInfo } from '../action/action';
// import '../style/index.scss';
// import '../asset/font/iconfont.css';
// import img from '../asset/image/timg.jpg';
import { Link } from 'react-router-dom';

/* 
 * Redux
 */
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        state: state
    };
}

// 获取 action 创建函数
function mapDispatchToProps(dispatch) {
    return {
        updateTitle: () => {
            dispatch(addTitle())
        },
        updateUserInfo: () => {
            fetchUser().then(res=>dispatch(saveInfo(res)));
        }
    };
}

// 异步处理redux
const fetchUser = () => new Promise(function (resolve, reject) {
    return axios.get('/api/getUserInfo')
        .then(response => {
            resolve(response.data)
        })
})

class Home extends React.Component {
    render() {
        const { updateTitle, updateUserInfo } = this.props;
        return (
            <div>
                <h1>I <i className="iconfont icon-liked"></i> ShangHai!!</h1>
                <Link to="/Article">走一个</Link>
                <div><button onClick={() => updateTitle()}>修改父组件title</button></div>
                <div><button onClick={() => updateUserInfo()}>修改父组件userInfo异步</button></div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);