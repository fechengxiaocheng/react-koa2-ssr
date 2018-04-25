import { combineReducers } from 'redux';
import { ADD_TITLE, SAVE_INFO } from '../action/action';

function addTitle(state = 'React', action) {
    switch (action.type) {
        case ADD_TITLE:
            return 'React+Koa2+Webpack+SSR+Redux'   
        default:
            return state
    }
}

function userInfo(state = {
    userName: '未登录'
}, action) {
    switch (action.type) {
        case SAVE_INFO:
            return Object.assign({}, action.obj)
        default:
            return state
    }
}

const todoApp = combineReducers({
    addTitle,
    userInfo
})

export default todoApp;