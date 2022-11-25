class UnauthorizedError extends Error {
  json() {
    return {
      status: 'failed',
      message: 'unauthorized',
    };
  }
}

module.exports = UnauthorizedError;
