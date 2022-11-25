class IdNotFoundError extends Error {
  json() {
    return {
      status: 'failed',
      message: 'id not found',
    };
  }
}

module.exports = IdNotFoundError;
