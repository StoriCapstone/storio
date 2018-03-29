import Amplify, { Storage, } from 'aws-amplify';
import SparkMD5 from 'spark-md5';
const AWS_AMPLIFY = `{"aws_app_analytics":"enable","aws_cognito_identity_pool_id":"us-east-1:03453f28-a0f9-487c-a81d-8fdf9dd759d7","aws_cognito_region":"us-east-1","aws_content_delivery":"enable","aws_content_delivery_bucket":"storio-hosting-mobilehub-1637155339","aws_content_delivery_bucket_region":"us-east-1","aws_content_delivery_cloudfront":"enable","aws_content_delivery_cloudfront_domain":"d2xsngufhbht9t.cloudfront.net","aws_mobile_analytics_app_id":"de859c48383146d78be675231697cb2b","aws_mobile_analytics_app_region":"us-east-1","aws_project_id":"e0f3c7a8-2eae-11e8-90cc-23b242305028","aws_project_name":"storio-2018-03-23-11-28-42","aws_project_region":"us-east-1","aws_resource_name_prefix":"storio-mobilehub-1637155339","aws_sign_in_enabled":"enable","aws_user_files":"enable","aws_user_files_s3_bucket":"storio-userfiles-mobilehub-1637155339","aws_user_files_s3_bucket_region":"us-east-1","aws_user_pools":"enable","aws_user_pools_id":"us-east-1_FNG5CMZWa","aws_user_pools_mfa_type":"OFF","aws_user_pools_web_client_id":"4kdtes543fqjcs5kh40aukik73","aws_user_settings":"enable"}`;
Amplify.configure(JSON.parse(AWS_AMPLIFY));

/*
  This function will given a blob, and an extension
  will add to s3 and return a promise for the resulting
  filename that represents the s3 key.
  DRY FTW!
 */
const addBlobToS3 = (blob, extension) => {
  return new Promise((resolve, reject) => {
    const blobFile = new FileReader();
    blobFile.readAsArrayBuffer(blob);
    blobFile.onloadend = function() {
      const hash = SparkMD5.ArrayBuffer.hash(blobFile.result);
      const fileName = `${hash}.${extension}`;
      Storage.put(fileName, blob)
        .then(result => {
          resolve(result.key);
        })
        .catch(err => reject(err));
    };
  });
};
/*
  This function will given a url/key, it will check if it needs
  to get an url from s3, and if so, does so. it will return
  a promise for a possibly temporary url.
  DRY FTW!
 */
const getMediaUrl = async keyOrUrl => {
  if (keyOrUrl === '') {
    throw new Error('keyOrUrl cannot be empty');
  }
  if (keyOrUrl.startsWith('http:') || keyOrUrl.startsWith('https:')) {
    return keyOrUrl;
  } else {
    const s3Url = await Storage.get(keyOrUrl);
    return s3Url;
  }
};

module.exports = {
  addBlobToS3,
  getMediaUrl,
};
