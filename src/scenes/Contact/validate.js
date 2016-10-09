const validate = values => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Name is Required';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.message) {
    errors.message = 'Message is Required';
  }
  return errors;
};

export default validate;
