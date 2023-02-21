const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: 'The milky way universe with ufos',
      n: 1,
      size: '1024x1024'
    });
    const src = response.data.data[0].url;
    res.status(200).json({
      success: true,
      url: src
    });
  } catch (err) {
    if (err.response) {
      // eslint-disable-next-line no-console
      console.log(err.response.status);
      // eslint-disable-next-line no-console
      console.log(err.response.data);
    } else {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
    res.status(400).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};

module.exports = { generateImage };
