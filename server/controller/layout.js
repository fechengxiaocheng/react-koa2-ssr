'use strict';
import config from 'config';
/**
 * content 上下文 data后期需要挂在的数据
 */
exports.layout = function (content, initState, staticStr) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <link rel="shortcut icon" href="/favicon.ico">
            <title>React App</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>
            ${config.env === 'development' ? '<script type="text/javascript" src="/public/main.bundle.js"></script>':staticStr}
        </body>
        </html>
    `;
};