import express from 'express'; 
import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';

// React Components
import App from '../components/app';


const router = express.Router();

router.get('/', (req, res) => {
    const responseString = `
        <html>
            <head><title>Hacker News</title></head>
            <body>
                <div id="root">{{{comp}}}</div>
                <script src="/app.js" charset="utf-8"></script>
                <script src="/main.js" charset="utf-8"></script>
            </body>
        </html>
        `;
    const template = hbs.compile(responseString);
    const reactComp = renderToString(<App />);
    const htmlToSend = template({ comp: reactComp });
    res.send(htmlToSend);
});

export default router;