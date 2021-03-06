const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'cardHolderName',
    'mobileNumber',
    'cardNumber',
    'card-exp-date-m',
    'card-exp-date-y',
    'cvc',
    'amount'
  ];
  requiredFields.forEach((r) => {
    if (!values[r]) {
      errors[r] = 'Required Field';
    }
  });
  // if (values.cardNumber && values.cardNumber.length !== 16) {
  //   errors.cardNumber = 'Not a valid card number';
  // }
  // if (isNaN(parseInt(values.amount, 10) === 0)) {
  //   errors.amount = 'Enter a valid amount';
  // }
  // if (isNaN(parseInt(values.cvc, 10)) || values.cvc.length !== 3) {
  //   errors.cvc = 'Invalid CVV';
  // }
  // if (isNaN(parseInt(values.mobileNumber, 10)) && values.mobileNumber.length !== 10) {
  //   errors.mobileNumber = 'Enter valid mobile number';
  // }
  return errors;
};

export default validate;
