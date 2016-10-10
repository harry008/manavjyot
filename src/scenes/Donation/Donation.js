import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import { Field, reduxForm } from 'redux-form';

import { Heading, Grid, Row, Col } from 'components';

import './Donation.scss';

import validate from './validate-form';
const renderTextField = ({ input, label, longLabel, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={ label }
    floatingLabelText={ longLabel }
    errorText={ touched && error }
    fullWidth
    { ...input }
    { ...custom }
  />
);
renderTextField.propTypes = {
  custom: PropTypes.object,
  label: PropTypes.string,
  longLabel: PropTypes.string,
  meta: PropTypes.object,
  touched: PropTypes.bool,
  error: PropTypes.string,
  input: PropTypes.object
};

class Donation extends Component {

  componentDidMount() {
    const window = window || {}; // primary hack
    const src = 'https://js.stripe.com/v2/';

    const stripeScriptEl = document.createElement('script');
    stripeScriptEl.setAttribute('type', 'text/javascript');
    stripeScriptEl.setAttribute('src', src);
    this.refs['donation-page'].appendChild(stripeScriptEl);
    this.timer = setInterval(_ => {
      if (window.Stripe) {
        this.Stripe = window.Stripe;
        this.Stripe.setPublishableKey('pk_test_rhQH3OfsqvbQFnq4GFOywZVp');
        console.log('Window.Stripe is now available');
        clearInterval(this.timer);
      }
    });
  }

  handleDonate = (values) => {
    console.log('Values for donation: ', values);
  };

  render() {
    const { handleSubmit, submitting, valid, reset } = this.props;
    return (
      <div ref="donation-page">
        <Helmet title="Donation" />
        <Grid fluid>
          <Row>
            <Col xs className="donation-form-wrapper">
              <h1 className="center">Donation</h1>
              <Paper zDepth={ 2 } className="donation-form-paper">
                <form ref="donation-form" action="/api/donation">
                  <Grid fluid>
                    <Row>
                      <Col xs>
                        <Field
                          name="cardHolderName"
                          label="Card Holder's Name"
                          longLabel="Enter Card Holder's Name Here"
                          component={ renderTextField }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs>
                        <Field
                          name="mobileNumber"
                          label="Your Mobile Number"
                          longLabel="Enter Your Mobile Number"
                          component={ renderTextField }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={ 12 }>
                        <Field
                          name="cardNumber"
                          label="Card Number"
                          longLabel="Enter Your Card Number"
                          component={ renderTextField }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={ 6 } sm={ 4 } md={ 4 }>
                        <Field
                          name="card-exp-date-m"
                          label="Month"
                          longLabel="Expiry Month"
                          component={ renderTextField }
                        />
                      </Col>
                      <Col xs={ 6 } sm={ 4 } md={ 4 }>
                        <Field
                          name="card-exp-date-y"
                          label="Year"
                          longLabel="Expiry Year"
                          component={ renderTextField }
                        />
                      </Col>
                      <Col xs={ 12 } sm={ 4 } md={ 4 }>
                        <Field
                          name="cvc"
                          label="Enter CVC"
                          longLabel="CVC Number"
                          component={ renderTextField }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs>
                        <Field
                          name="amount"
                          label="Amount"
                          longLabel="Enter Donation Amount"
                          component={ renderTextField }
                        />
                      </Col>
                    </Row>
                    <Row className="paper-actions">
                      <Col xs className="center">
                        <RaisedButton
                          ref="submitBtn"
                          label={ 'Donate' }
                          secondary
                          labelPosition={ 'before' }
                          icon={ <Send /> }
                          disabled={ submitting && !valid }
                          onTouchTap={ handleSubmit(this.handleDonate) }
                        />
                      </Col>
                      <Col xs className="center">
                        <RaisedButton
                          label={ 'Reset values' }
                          onTouchTap={ reset }
                        />
                      </Col>
                    </Row>
                  </Grid>
                </form>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Donation.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'donation',
  validate
})(Donation);
