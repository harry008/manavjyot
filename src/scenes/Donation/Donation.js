import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import {Field, reduxForm} from 'redux-form';

import {Heading, Grid, Row, Col} from 'components';

import validate from './validate-form';
const renderTextField = ({input, label, longLabel, meta: {touched, error}, ...custom}) => (
  <TextField hintText={ label }
             floatingLabelText={ longLabel }
             errorText={ touched && error }
             fullWidth
             { ...input }
             { ...custom }
  />);

export const renderSelectField = ({input, label, meta: {touched, error}, children}) => (
  <SelectField
    floatingLabelText={label}
    fullWidth={true}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
);

const renderMonths = () => {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      <MenuItem
        key={i} value={i}
        primaryText={ i < 10 ? `0${i}` : i }
      />
    );
  }
  return months;
};

const renderYears = () => {
  let years = [];
  for (let i = 2016; i <= 2030; i++) {
    years.push(
      <MenuItem
        key={i}
        value={i}
        primaryText={ i }
      />
    );
  }
  return years;
};

const Donation = ({handleSubmit, valid}) => {

  const handleDonate = (values) => {
    console.log('Values for donation: ', values);
  };

  return (
    <div>
      <Helmet title="Donation"/>
      <Grid>
        <h1>Donation</h1>
        <Paper>
          <Heading type={ 'h1' }>Donate fund</Heading>
          <form ref="donation-form" action="/api/donation">
            <Grid>
              <Row>
                <Field
                  name="name"
                  component={ renderTextField}
                  label="Your Name"
                  langLabel="Enter Your Name Here"
                />
              </Row>
              <Row>
                <Field
                  name="cardHolderName"
                  component={ renderTextField}
                  label="Card Holder's Name"
                  langLabel="Enter Card Holder's Name Here"
                />
              </Row>
              <Row>
                <Field
                  name="mobileNumber"
                  component={ renderTextField}
                  label="Your Mobile Number"
                  langLabel="Enter Your Mobile Number"
                />
              </Row>
              <Row>
                <Field
                  name="cardNumber"
                  component={ renderTextField }
                  label="Card Number"
                  langLabel="Enter Your Card Number"
                />
              </Row>
              <Row>
                <Col xs={2} md={2}>Valid through</Col>
                <Col xs={ 3 } md={ 3 }>
                  <Field
                    name="card-exp-date-m"
                    label="Month"
                    component={ renderSelectField }
                  >
                    {renderMonths()}
                  </Field>
                </Col>
                <Col xs={ 3 } md={ 3 }>
                  <Field
                    name="card-exp-date-y"
                    label="Year"
                    component={ renderSelectField }
                  >
                    {renderYears()}
                  </Field>
                </Col>
                <Col xs={3} md={3}>
                  <Field
                    name="cvv"
                    label="Enter CVV"
                    longLable="Enter CVV Number"
                    component={renderTextField}
                  />
                </Col>
              </Row>
              <Row>
                <Field
                  name="amount"
                  label="Amount"
                  longLabel="Enter Donation Amount"
                  component={renderTextField}
                />
              </Row>
              <Row>
                <RaisedButton
                  label={'Donate'}
                  onTouchTap={handleSubmit(handleDonate)}
                />
              </Row>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default reduxForm({
  form: 'donation',
  validate
})(Donation);
