const Validator = require('validator');
const isEmpty = require('./isEmpty');

// Validate user input for task
module.exports = function validateTask(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.priority = !isEmpty(data.priority) ? data.priority : '';
  data.duedate = !isEmpty(data.duedate) ? data.duedate : '';

  if (!Validator.isLength(data.text, { min: 10, max: 100 })) {
    errors.text = 'Task must be between 10 and 100 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator.isEmpty(data.priority)) {
    errors.priority = 'Priority field is required';
  }

  if (Validator.isEmpty(data.duedate)) {
    errors.duedate = 'Due date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
