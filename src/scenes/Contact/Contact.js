import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// validation fucntion
import validate from './validate';

// helper function for input controls
const renderTextField = props => (
  <TextField hintText={ props.label }
             floatingLabelText={ props.label }
             fullWidth
             errorText={ props.touched && props.error }
             { ...props }
  />
);

renderTextField.propTypes = {
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};

const Contact = ({className}) => {
  return (
    <div className={ className }>
      <Paper zDepth={ 2 } className="contact-form">
        <div className="page-header">
          <h1>Contact Us</h1>
        </div>
        <form action="/api/contact">
          <div>
            <Field
              name="fullName"
              component={ renderTextField }
              label="Full Name"
            />
          </div>
          <div>
            <Field
              name="email"
              component={ renderTextField }
              label="Email"
            />
          </div>
          <div>
            <Field
              name="message"
              component={ renderTextField }
              label="Your Message"
              multiLine
              rows={ 2 }
            />
          </div>
          <div>
            <RaisedButton primary label="Submit"/>
            <RaisedButton label="Clear values" onClick={ () => ({}) }/>
          </div>
        </form>
      </Paper>
    </div>
  );
};


Contact.propTypes = {
  className: PropTypes.string,
};

export default reduxForm({
  form: 'contact',
  validate
})(Contact);
