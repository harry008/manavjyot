// Useful for debugging node.js code that has been bundled with Webpack.
// https://github.com/evanw/node-source-map-support
import 'source-map-support/register';

import http from 'http';
import path from 'path';
import mongoose from 'mongoose';

// Express deps
import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import lusca from 'lusca';
import dotenv from 'dotenv';
import ConnectMongo from 'connect-mongo';
import passport from 'passport';
import expressValidator from 'express-validator';
import errorhandler from 'errorhandler';

// React deps
import React from 'react';
import ReactDOM from 'react-dom/server';
import match from 'react-router/lib/match';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { trigger } from 'redial';

// react-tap-event-plugin for material-ui
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
// material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue100, blue500, blue700 } from 'material-ui/styles/colors';

// Our deps
import configureStore from './state/store';
import Html from './components/Html';
import getRoutes from './scenes';

/**
 * API keys and Passport configuration.
 */
import passportConfig from './server/config/passport';

import userController from './server/controllers/user';
import contactController from './server/controllers/contact';
import campaignsController from './server/controllers/campaign';
import donationController from './server/controllers/donation';

const debug = require('debug')('boldr:server');
const config = require('../tools/defaults');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: './src/.env' });

const MongoStore = ConnectMongo(session);

const app = express();

/**
 * Connect to MongoDB.
 */

const MongoConnectionOptions = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectionTimeoutMS: 5000
    }
  }
};

mongoose.connect(process.env.MONGODB_URI, MongoConnectionOptions);
mongoose.connection.on('error', (err) => {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.', err);
  // process.exit(1);
});

// Close db connection on application exit
process.on('SIGINT', _ => {
  mongoose.connection.close(_ => {
    console.log('Mongoose connection closed');
    process.exit(0);
  });
});


const server = http.createServer(app);
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   if (req.path === '/api/upload') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

// Routing handled on clint only
// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (!req.user &&
//       req.path !== '/login' &&
//       req.path !== '/signup' &&
//       !req.path.match(/^\/auth/) &&
//       !req.path.match(/\./)) {
//     req.session.returnTo = req.path;
//   }
//   next();
// });

app.use(favicon(path.resolve(process.cwd(), './static/favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'static'), { maxAge: 31557600000 }));

/**
 * App Routes
 */
app.post('/api/login', userController.postLogin);
app.post('/api/signup', userController.postSignup);
app.get('/api/logout', userController.logout);
app.post('/api/forgot', userController.postForgot);
app.post('/api/reset/:token', userController.postReset);
// app.get('/api/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/api/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/api/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/api/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);

// Contact us
app.post('/api/contact', contactController);

// Handle Donation
app.post('/api/donate', passportConfig.isAuthenticated, donationController);

// Campaigns
app.get('/api/campaigns', campaignsController.getCampaigns);
app.post('/api/campaigns', passportConfig.isAuthenticated, campaignsController.postCampaign);
app.post('/api/campaigns/:id', passportConfig.isAuthenticated, campaignsController.updateCampaign);

injectTapEventPlugin();

app.get('*', (req, res) => {
  if (__DEV__) {
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.originalUrl);
  const location = memoryHistory.createLocation(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    const staticMarkup = ReactDOM.renderToStaticMarkup(
      <Html
        assets={ webpackIsomorphicTools.assets() }
        store={ store }
      />);
    const renderToStringMarkup = ReactDOM.renderToString(
      <Html
        assets={ webpackIsomorphicTools.assets() }
        store={ store }
      />);

    if (staticMarkup === renderToStringMarkup) {
      console.log('both  markups are equal');
    } else {
      console.log('Both markups are different');
    }

    res.send(`<!doctype html>
                  ${staticMarkup}`);
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

/**
 * Error Handler.
 */
app.use(errorHandler());

server.listen(config.SSR_PORT, (err) => {
  if (err) {
    debug(err);
    return;
  }
  console.log(`🚀  Web server listening on ${config.HOST}:${config.SSR_PORT} in ${process.env.NODE_ENV} mode`);
});
