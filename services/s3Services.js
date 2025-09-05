const AWS = require('aws-sdk');
require('dotenv').config();
const uploadToS3 = (data, filename) => {
    const BUCKET_NAME = process.env.bucket_name;
    const IAM_USER_KEY = process.env.iam_user_key;
    const IAM_USER_SECRET = process.env.iam_user_secret;

    let s3Bucket = new AWS.S3({
        accessKeyId : IAM_USER_KEY,
        secretAccessKey : IAM_USER_SECRET
    });

    

        var params = {
            Bucket : BUCKET_NAME,
            Key : filename,
            Body : data,
            ACL : 'public-read'
        }
        
        return new Promise((resolve,reject)=>{

            s3Bucket.upload(params, (err,s3response)=>{
                if(err){
                    console.log("something went wrong",err);
                    reject(err);
                }
                else{
                    console.log("success",s3response);
                     resolve(s3response.Location);
                }
            })
        })


}

module.exports = {
    uploadToS3
}