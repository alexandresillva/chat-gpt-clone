function validatePrompt(req, res, next) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: 'Prompt is required'
    });
  }

  if (typeof prompt !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Prompt must be a string'
    });
  }

  if (prompt.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Prompt cannot be empty'
    });
  }

  if (prompt.length > 4000) {
    return res.status(400).json({
      success: false,
      error: 'Prompt is too long (max 4000 characters)'
    });
  }

  next();
}

module.exports = { validatePrompt };
