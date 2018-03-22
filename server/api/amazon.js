const router = require('express').Router()
var crypto = require('crypto');
var path = require('path');
var secrets = require('../../secrets.js')
var s3 = require('../amazonS3/s3');
module.exports = router

var s3Config = {
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION
};

router.get('/s3_credentials', function(request, response) {
  if (request.query.filename) {
    var filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(request.query.filename);
    response.json(s3.s3Credentials(s3Config, {filename: filename, contentType: request.query.content_type}));
  } else {
    response.status(400).send('filename is required');
  }
});
