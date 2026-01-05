const OpenAI = require("openai");

class OpenAIService {
  static configuration(){
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return openai;
  }
  
  static textCompletion({prompt}){
    return {
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };
  }
}

module.exports = OpenAIService;

