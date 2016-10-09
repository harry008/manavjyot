import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Heading, TextBlock } from 'components';

const Volunteer = (props) => {
  return (
        <div className="Volunteer">
              <Helmet title="Volunteer" />
              <Grid>
                <Row>
                    <Col xs>
                            <Heading type="h1">Volunteer - { props.params.id }</Heading>
                    </Col>
                </Row>
            </Grid>
        </div>
  );
};

export default Volunteer;
