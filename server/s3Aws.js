/* eslint-disable no-unused-vars */
const { S3 } = require('aws-sdk');

exports.s3Upload = async () => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME
  };
};
