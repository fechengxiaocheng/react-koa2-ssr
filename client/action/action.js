/*
 * action 类型
 */
export const ADD_TITLE = 'ADD_TITLE';
export const SAVE_INFO = 'SAVE_INFO';

/*
 * action 创建函数
 */

export function addTitle() {
    return { type: ADD_TITLE }
}

export function saveInfo(obj) {
    return { type: SAVE_INFO, obj}
}