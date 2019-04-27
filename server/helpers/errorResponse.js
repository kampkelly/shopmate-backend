const errorResponse = (req, res, status, code, messages, fields) => ({
  error: {
    status,
    code,
    message: messages,
    field: fields
  }
});

export default errorResponse;
