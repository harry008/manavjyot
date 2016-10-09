import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class Login extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <Helmet title="Login" />
              <h1>Login</h1>
            </div>
        );
    }
}

export default Login;
