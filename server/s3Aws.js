/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const util = require('util');
require('dotenv/config');
const { S3 } = require('aws-sdk');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const readFile = util.promisify(fs.readFile);
const s3 = new S3({
  region,
  secretKey,
  accessKey
});

const uploadFile = async (data, urlName) => {
  await s3.upload({
    Bucket: bucketName,
    Body: data,
    Key: urlName
  }).promise();
  return urlName;
};

const testing = async () => {
  const src = Date.now() + '.jpg';
  const fileName = 'server/public/images/1678600474917.jpg';
  try {
    const data = await readFile(fileName);
    console.log(data);
    const url = await uploadFile(data, src);
    console.log(url);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { uploadFile };
