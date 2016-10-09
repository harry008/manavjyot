import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import './Signup.scss';

class Signup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Helmet title="Signup" />
            <h1>Signup</h1>
          </div>
        );
    }
}

export default Signup;
