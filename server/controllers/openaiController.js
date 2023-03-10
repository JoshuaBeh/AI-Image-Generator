/* eslint-disable no-console */
const fs = require('fs');
const { s3AwsUpload } = require('../s3Aws');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// const readFile = util.promisify(fs.readFile);

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
      size: imageSize,
      response_format: 'b64_json'
    });
    const source = response.data.data[0].b64_json;
    const buffer = Buffer.from(source, 'base64');

    // Generate a unique filename for the image and write it to the server's public/images directory
    const src = Date.now() + '.jpg';
    const fileName = `server/public/images/${src}`;
    await fs.writeFileSync(fileName, buffer);
    const fileLocation = await s3AwsUpload(fileName, src);

    res.status(200).json({
      success: true,
      file: fileLocation.Location
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err);
      console.log(err.message);
    }
    res.status(400).json({
      success: false,
      message: err.response.data
    });
  }
};

module.exports = { generateImage };
