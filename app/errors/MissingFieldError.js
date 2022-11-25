class MissingFieldError extends Error {
  json() {
    return {
      status: 'failed',
      message: 'missing required field(s)',
    };
  }
}

module.exports = MissingFieldError;
