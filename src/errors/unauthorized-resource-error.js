module.exports = function UnauthorizedResourceError(message = 'Resource does not belong to the authenticated user') {
  this.name = 'UnauthorizedResourceError';
  this.message = message;
};
