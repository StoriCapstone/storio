import Amplify, { Storage, } from 'aws-amplify';
import SparkMD5 from 'spark-md5';
import awsExports from '../../aws-exports';

  Amplify.configure(awsExports);


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
