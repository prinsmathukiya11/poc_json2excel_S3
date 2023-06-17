const aws = require("aws-sdk");
const fs = require("fs");

aws.config.update({
  secretAccessKey: process.env.aws_secret_key,
  accessKeyId: process.env.aws_access_key,
  region: process.env.aws_region,
});

module.exports.uploadFile = (filePath, extension) => {
  const s3 = new aws.S3();
  const body = fs.readFileSync(filePath);
  var data = {
    Key: Date.now() + extension,
    Body: body,
    Bucket: process.env.aws_bucket,
    ACL: "public-read",
  };
  s3.upload(data, function (err, data) {
    if (err) {
      console.log("Error uploading file:", err);
    } else {
      console.log("File uploaded successfully. Location:", data.Location);
    }
  });
};
