import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import App from '../src/App';
const PORT = process.env.PORT || 3006;
import Routes from '../src/Routes';
const app = express();
const sheets = new ServerStyleSheets();


app.get('/', (req, res) => {
    const currentRoute =
        Routes.find(route => matchPath(req.url, route)) || {};
    let context = {};
    const app = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}><App /></StaticRouter>
        )
    );

    const css = sheets.toString();
    if (context.url) {
        return res.redirect(301, context.url);
    }
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
            data.replace('<div id="root"></div>', `
            <!DOCTYPE html>
            <html>
              <head>
                <title>My page</title>
                <style id="jss-server-side">${css}</style>
              </head>
              <body>
                <div id="root">${app}</div>
              </body>
            </html>
          `)
        );
    });
});


app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});