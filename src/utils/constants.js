export const validationResult = (validator, fieldName) => {
  return Object.keys(validator)
    .map((errorKey) => {
      const errorResult = validator[errorKey](fieldName);
      return { [errorKey]: errorResult };
    })
    .reduce((acc, item) => ({ ...acc, ...item }), {});
};
