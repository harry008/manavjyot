// Useful for debugging node.js code that has been bundled with Webpack.
// https://github.com/evanw/node-source-map-support
import 'source-map-support/register';

import http from 'http';
import path from 'path';
// Express deps
import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
// React deps
import React from 'react';
import ReactDOM from 'react-dom/server';
import match from 'react-router/lib/match';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { trigger } from 'redial';


// material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

// Our deps
import configureStore from './state/store';
import Html from './components/Html';
import getRoutes from './scenes';

const debug = require('debug')('boldr:server');
const config = require('../tools/defaults');

const app = express();
const server = http.createServer(app);

app.use(favicon(path.resolve(process.cwd(), './static/favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'static')));

app.get('*', (req, res) => {
  if (__DEV__) {
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.originalUrl);
  const location = memoryHistory.createLocation(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send(`<!doctype html>
      ${ReactDOM.renderToString(<Html assets={ webpackIsomorphicTools.assets() } store={ store } />)} `);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const { dispatch, getState } = store;

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch,
        getState
      };

      const { components } = renderProps;

      trigger('fetch', components, locals).then(() => {
        const muiTheme = getMuiTheme({
          palette: {
            primary1Color: green500,
            primary2Color: green700,
            primary3Color: green100,
          },
        }, {
          avatar: {
            borderColor: null,
          },
          userAgent: req.headers['user-agent'],
        });


        const component = (
          <MuiThemeProvider muiTheme={ muiTheme }>
            <Provider store={ store } key="provider">
              <RouterContext { ...renderProps } />
            </Provider>
          </MuiThemeProvider>
        );
        res.status(200);
        global.navigator = { userAgent: req.headers['user-agent'] };
        res.send('<!doctype html>\n' + // eslint-disable-line
          ReactDOM.renderToString(
            <Html assets={ webpackIsomorphicTools.assets() } component={ component } store={ store } />
          ));
      }).catch((mountError) => {
        debug(mountError.stack);
        return res.status(500);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

server.listen(config.SSR_PORT, (err) => {
  if (err) {
    debug(err);
    return;
  }
  console.log(`🚀  Web server listening on ${config.HOST}:${config.SSR_PORT} in ${process.env.NODE_ENV} mode`);
});
