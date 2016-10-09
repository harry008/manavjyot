import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Grid, Row, Col, Heading, TextBlock } from 'components';

import { fetchVolunteers } from './actions';

const mapStateToProps = (state) => {
  return {
    volunteers: state.volunteers,
    loading: state.volunteers.loading
  };
};

@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchVolunteers())
})
@connect(mapStateToProps, { fetchVolunteers })
class Volunteers extends Component {

  static propTypes = {
    volunteers: PropTypes.object
  };

  render() {
    return (
      <div className = "Volunteers">
        <Helmet title = "Volunteers" />
        <Grid>
          <Row>
            <Col xs>
              <Heading type = "h1" >Volunteers</Heading>
            </Col>
          </Row>
          <Row>
            { this.props.volunteers.data.map((volunteer, i) => {
              return (
                <Col xs key={ i }>
                  <Heading type="h3">{volunteer.name}</Heading>
                  <pre>{JSON.stringify(volunteer.address, null, 2)}</pre>
                </Col>);
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Volunteers;
