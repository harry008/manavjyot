import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory, match } from 'react-router/es6';
import { syncHistoryWithStore } from 'react-router-redux';
import { trigger } from 'redial';
import WebFontLoader from 'webfontloader';
import 'theme/main.scss';

// react-tap-event-plugin for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getRoutes from './scenes';
import configureStore from './state/store';

injectTapEventPlugin();

// The element React looks for to mount
const MOUNT_POINT = window.document.getElementById('content');
// initialState is serialized on the window for the client-side to grab
// once rendering takes place.
const initialState = window.__PRELOADED_STATE || {};

const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

const { dispatch, getState } = store;
const routes = getRoutes(store, history);

WebFontLoader.load({
  google: { families: ['Roboto:300,400,700'] }
});

const render = () => {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;

  match({ routes, location }, () => {
    ReactDOM.render(
      <AppContainer>
        <MuiThemeProvider>
          <Provider store={ store } key="provider">
            <Router routes={ routes } history={ history } key={ Math.random() } />
          </Provider>
        </MuiThemeProvider>
      </AppContainer>,
      MOUNT_POINT
    );

    return history.listen(location => {
      match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error) {
          console.log('⚠  ==> React Router match failed.'); // eslint-disable-line no-console
        }
        const { components } = renderProps;
        const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,
          dispatch,
          getState
        };
        if (window.__PRELOADED_STATE) {
          delete window.__PRELOADED_STATE;
        } else {
          trigger('fetch', components, locals);
        }
        trigger('defer', components, locals);
      });
    });
  });
};

const unsubscribeHistory = render();

if (module.hot) {
  module.hot.accept('./scenes/index', () => {
    unsubscribeHistory();
    setTimeout(render);
  });
}
