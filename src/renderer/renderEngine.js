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
            <head><title>Hacker News</title></head>
            <body>
                <div id="root">${reactComp}</div>
                <script>
                    window.INITIAL_STATE=${serialize(store.getState())}
                </script>
                <script src="/app.js" charset="utf-8"></script>
                <script src="/main.js" charset="utf-8"></script>    
                <link rel="stylesheet" type="text/css" href="app.css">
            </body>
        </html>
        `;
    

    

    return html;
}