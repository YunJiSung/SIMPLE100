const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const config = require("../config/key.js");
// const access_key = 'a3VK4fCvhfiP0n6FpwkN';
// const secret_key = 'kubO1bdtOb7hotjJwKSTKJkvbr5ItrKxdVdGD36A';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: config.access_key,
        secretAccessKey: config.secret_key
    }
});

function setUpload(bucket) {
    const upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: bucket,
            acl: "public-read-write",
            key: function (req, file, cb) {
                let extenstion = path.extname(file.originalname)
                cb(null, Date.now().toString() + extenstion);
            }
        })
    }).single("file")
    return upload
}

module.exports = setUpload;

// const AWS = require('aws-sdk');
// const multer = require("multer")
// const multerS3 = require("multerS3")

// const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
// const region = 'kr-standard';
// const access_key = 'a3VK4fCvhfiP0n6FpwkN';
// const secret_key = 'kubO1bdtOb7hotjJwKSTKJkvbr5ItrKxdVdGD36A';


// const S3 = new AWS.S3({
//     endpoint: endpoint,
//     region: region,
//     credentials: {
//         accessKeyId: access_key,
//         secretAccessKey: secret_key
//     }
// });


// const bucket_name = 'sample-bucket';
// const local_file_path = '/tmp/test.txt';



// (async () => {

//     let object_name = 'sample-folder/';
//     // create folder
//     await S3.putObject({
//         Bucket: bucket_name,
//         Key: object_name
//     }).promise();

//     object_name = 'sample-object';

//     // upload file
//     await S3.putObject({
//         Bucket: bucket_name,
//         Key: object_name,
//         ACL: 'public-read',
//         // ACL을 지우면 전체 공개되지 않습니다.
//         Body: fs.createReadStream(local_file_path)
//     }).promise();

// })();

// function setUpload(bucket) {
//     const upload = multer({
//         storage: multerS3({
//             s3: S3,
//             bucket: bucket,
//             acl: "public-read-write",
//             key: function (req, file, cb) {
//                 let extenstion = path.extname(file.originalname)
//                 cb(null, Date.now().toString() + extenstion);
//             }
//         })
//     }).single("file")
//     return upload
// }

// module.exports = setUpload;