const InputPrompt = require("../models/input-prompt");
const OpenAIService = require("../config/openai");

module.exports = {
  async sendText(req, res, next) {
    try {
      const openaiAPI = OpenAIService.configuration();
      const inputModel = new InputPrompt(req.body);
      
      const response = await openaiAPI.chat.completions.create(
        OpenAIService.textCompletion(inputModel)
      );
      
      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content
      });
    } catch (error) {
      next(error);
    }
  }
}