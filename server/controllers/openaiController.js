/* eslint-disable no-console */
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  let imageSize = '256x256';

  if (size === 'Small') {
    imageSize = '256x256';
  } else if (size === 'Medium') {
    imageSize = '512x512';
  } else {
    imageSize = '1024x1024';
  }
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize
    });
    const src = response.data.data[0].url;
    res.status(200).json({
      success: true,
      url: src
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    res.status(400).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};

module.exports = { generateImage };
