export const validationResult = (validator, fieldName) => {
  debugger;
  Object.keys(validator[fieldName])
    .map((errorKey) => {
      const errorResult = validator[fieldName][errorKey](fieldName);
      return { [errorKey]: errorResult };
    })
    .reduce((acc, item) => ({ ...acc, ...item }), {});
};
