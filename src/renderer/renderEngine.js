import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '../routes/Routes'



export default (req, store) => {
    const reactComp = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>
        );
    const html = `
        <html>
            <head>
            <title>Hacker News</title>
            <link rel="stylesheet" type="text/css" href="app.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <div id="root">${reactComp}</div>
                <script>
                    window.INITIAL_STATE=${serialize(store.getState()).replace(/</g,'\\u003c')}
                </script>
                <script src="/app.js" charset="utf-8"></script>
                <script src="/main.js" charset="utf-8"></script>    
            </body>
        </html>
        `;
    

    

    return html;
}