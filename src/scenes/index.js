// polyfill to use require.ensure. Require.ensure is an alternative to System.import
if (typeof require.ensure !== 'function') require.ensure = (deps, cb) => cb(require);

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default (store) => {
    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    return {
        path: '/',
        component: require('./App').default,
        indexRoute: {
            component: require('./Home').default
        },
        childRoutes: [ // get rid of this
            {
                path: 'contact',
                getComponent(nextState, cb) {
                    require.ensure(['./Contact'], require => {
                        const Contact = require('./Contact');
                        loadModule(cb)(Contact);
                    }, 'contact');
                }
            }, {
                path: 'volunteers',
                getComponent(nextState, cb) {
                    require.ensure(['./Volunteers'], require => {
                        const Volunteers = require('./Volunteers');
                        loadModule(cb)(Volunteers);
                    }, 'volunteers');
                }
            }, {
                path: 'donation',
                getComponent(nextState, cb) {
                    require.ensure(['./Donation'], require => {
                        const Donation = require('./Donation');
                        loadModule(cb)(Donation);
                    }, 'donation');
                }
            }, {
                path: 'login',
                getComponent(nextState, cb) {
                    require.ensure(['./Login'], require => {
                        const Login = require('./Login');
                        loadModule(cb)(Login);
                    }, 'login');
                }
            }, {
                path: 'signup',
                getComponent(nextState, cb) {
                    require.ensure(['./Signup'], require => {
                        const Signup = require('./Signup');
                        loadModule(cb)(Signup);
                    }, 'signup');
                }
            }, {
                path: 'campaigns',
                getComponent(nextState, cb) {
                    require.ensure(['./Campaigns'], require => {
                        const Campaigns = require('./Campaigns');
                        loadModule(cb)(Campaigns);
                    }, 'campaigns');
                }
            }, {
                path: 'about',
                getComponent(nextState, cb) {
                    require.ensure(['./About'], require => {
                        const About = require('./About');
                        loadModule(cb)(About);
                    }, 'about');
                }
            }
        ]
    };
};
