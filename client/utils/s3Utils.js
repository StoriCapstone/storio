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

module.exports = {
  addBlobToS3,
};
