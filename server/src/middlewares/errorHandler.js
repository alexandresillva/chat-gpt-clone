function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // OpenAI API errors
  if (err.response?.data?.error) {
    return res.status(err.response.status || 500).json({
      success: false,
      error: err.response.data.error.message || 'OpenAI API error'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
}

module.exports = { errorHandler, notFoundHandler };
