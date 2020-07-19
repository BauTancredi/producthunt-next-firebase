export default function validateCreateAccount(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "The name is mandatory";
  }

  if (!values.company) {
    errors.company = "The company is mandatory";
  }

  if (!values.url) {
    errors.url = "The URL is mandatory";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "URL not valid";
  }

  if (!values.description) {
    errors.description = "The description is mandatory";
  }

  return errors;
}
