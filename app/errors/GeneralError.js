class GeneralError extends Error {
  json() {
    return {
      status: 'error',
      message: this.message,
    };
  }
}

module.exports = GeneralError;
