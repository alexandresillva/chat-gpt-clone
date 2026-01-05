require('dotenv').config();

function validateEnvironment() {
  const requiredEnvVars = ['OPENAI_API_KEY'];
  
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease create a .env file with the required variables.');
    console.error('See .env.example for reference.\n');
    process.exit(1);
  }
  
  console.log('Environment variables validated successfully');
}

module.exports = { validateEnvironment };
