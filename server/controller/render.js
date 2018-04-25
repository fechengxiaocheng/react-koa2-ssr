import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import App from '../../client/components/App';
import { layout } from './layout';
import getCreateStore from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import router from '../../client/router/router';
import findSync from '../findFileName';

/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray 
 * @param {*} url 
 */
const getMatch = (routesArray, url) => {
    return routesArray.some(router => matchPath(url, {
        path: router.path,
        exact: router.exact,
    }))
}

/**
 * 渲染服务端路由
 */

module.exports = async (ctx, next) => {
    const { store, history } = getCreateStore(ctx);
    const branch = matchRoutes(router, ctx.req.url);
    // const promises = branch.map(({ route }) => {
    //     const fetch = route.component.fetch;
    //     return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
    // });
    // await Promise.all(promises).catch((err) => {
    //     console.log(err);
    // });
    let isMatch = getMatch(router, ctx.req.url);
    if (!isMatch) {
        await next();
    } else {
        const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={ctx.url}
                        context={{}}>
                        <App />
                    </StaticRouter>
                </Provider>
        )
        console.log(html);
        let initState = store.getState();
        // 生产环境，取打包后的静态文件
        let staticArr = findSync('./build/static/');
        let staticStr = `<script type="text/javascript" src="/static/${staticArr[1]}"></script><script type="text/javascript" src="/static/${staticArr[0]}"></script`;
        const body = layout(html, initState, staticStr);
        ctx.body = body;
    }
}