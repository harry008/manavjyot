import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class Campaigns extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <Helmet title="Campaigns -  Manavjyot Charity" />
              <h1>Campaigns</h1>
            </div>
        );
    }
}

export default Campaigns;
