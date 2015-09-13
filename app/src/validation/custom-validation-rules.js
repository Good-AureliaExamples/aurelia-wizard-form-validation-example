export function mustBeEmpty(msg) {
  this.passes((newValue) => {
    return !newValue;
  }).withMessage(() => {
    return msg;
  });
  return this;
}

