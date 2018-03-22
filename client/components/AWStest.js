var AWS = require('aws-sdk');
import React from 'react'

class AmazonWebServe extends React.Component {
componentDidMount(){
  //AWS.config.region = 'us-east-1'; // 1. Enter your region
//   CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
//     getApplicationContext(),
//     "us-east-1:1edaa653-b3dd-422c-abe1-e69c5be2a554", // Identity pool ID
//     Regions.US_EAST_1 // Region
// );
    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //     IdentityPoolId:  // 2. Enter your identity pool
    // });
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:1edaa653-b3dd-422c-abe1-e69c5be2a554'
        })
      });

      var bucket = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: 'storio-capstone'}
      });

    AWS.config.credentials.get(function(err) {
        if (err) alert(err);
        console.log(AWS.config.credentials);
    });
    // var bucketName = 'storio-capstone'; // Enter your bucket name
    // var bucket = new AWS.S3({
    //     params: {
    //         Bucket: bucketName
    //     }
    // });
    var fileChooser = document.getElementById('file-chooser');
    var button = document.getElementById('upload-button');
    var results = document.getElementById('results');
    button.addEventListener('click', function() {
        var file = fileChooser.files[0];
        if (file) {
            results.innerHTML = '';
            var objKey = 'testing/' + file.name;
            var params = {
                Key: objKey,
                ContentType: file.type,
                Body: file,
                ACL: 'public-read'
            };
            bucket.putObject(params, function(err, data) {
                if (err) {
                    results.innerHTML = 'ERROR: ' + err;
                } else {
                    listObjs();
                }
            });
        } else {
            results.innerHTML = 'Nothing to upload.';
        }
    }, false);
    function listObjs() {
        var prefix = 'testing';
        bucket.listObjects({
            Prefix: prefix
        }, function(err, data) {
            if (err) {
                results.innerHTML = 'ERROR: ' + err;
            } else {
                var objKeys = "";
                data.Contents.forEach(function(obj) {
                    objKeys += obj.Key + "<br>";
                });
                results.innerHTML = objKeys;
            }
        });
    }
}

render() {

  return (<div>
    <input type="file" id="file-chooser" />
    <button id="upload-button">Upload to S3</button>
    <div id="results"></div>
    <div>

    </div>
  </div>)
}
}

export default AmazonWebServe

