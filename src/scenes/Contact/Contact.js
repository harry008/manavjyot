import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import Helmet from 'react-helmet';

import {Heading, Card, Row, Col, Grid, TextBlock} from 'components';

// Material-ui
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';


import './Contact.scss';

// validation function
import validate from './validate';

// helper function for input controls
const renderTextField = ({input, label, longLabel, meta: {touched, error}, ...custom}) => (
  <TextField hintText={label}
             floatingLabelText={longLabel}
             errorText={touched && error}
             fullWidth={true}
             {...input}
             {...custom}
  />
);

// renderTextField.propTypes = {
//   label: PropTypes.string,
//   touched: PropTypes.bool,
//   error: PropTypes.string
//
// };

const Contact = ({submitting, pristine, handleSubmit, reset}) => {

  return (
    <div className="contact-form-wrapper">
      <Helmet title="Contact us"/>
      <Paper zDepth={ 2 } className="contact-form">
        <div className="page-header">
          <Heading type="h1" style={{paddingTop: '30px'}}>Contact us</Heading>
          <Divider />
        </div>
        <form action="/api/contact" onSubmit={ handleSubmit(values => {
          console.log('values in form', values);
        })}>
          <div>
            <Field
              name="fullName"
              component={ renderTextField }
              label="Full Name"
              longLabel="Enter Your Full Name"
            />
          </div>
          <div>
            <Field
              name="email"
              component={ renderTextField }
              label="Email"
              longLabel="Enter Your Email"
            />
          </div>
          <div>
            <Field
              name="message"
              component={ renderTextField }
              label="Your Message"
              longLabel="Enter Your Message here"
              multiLine={true}
              rows={ 3 }
            />
          </div>
          <div className="btn-group">
            <RaisedButton
              primary={true}
              label="Submit"
              className={'btn-group-btn'}
              disabled={ submitting || pristine }
              onTouchTap={ handleSubmit(values => console.log(values)) }/>
            <RaisedButton
              className={'btn-group-btn'}
              label="Clear values"
              onTouchTap={ reset }/>
          </div>
        </form>
      </Paper>
    </div>
  );
};

// Contact.propTypes = {
//   submitting: PropTypes.bool,
//   pristine: PropTypes.bool,
//   handleSubmit: PropTypes.func,
//   reset: PropTypes.func
// };

export default reduxForm({
  form: 'contact',
  validate
})(Contact);
