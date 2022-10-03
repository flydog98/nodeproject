const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const fs = require("fs");
const { render } = require("ejs");
const awsconfig = require("../config/awsconfig.json");

const bucket_name = "official-dataportal";

const object_name = "sample-object";
const object_folder_name = "sample-folder/";
const local_file_path = "./test.txt";

const access_key = awsconfig.accesskeyId;
const secret_key = awsconfig.secretAccessKey;

const s3 = new AWS.S3({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

router.post("/", async function (req, res, next) {
  // create folder
  await s3
    .putObject({
      Bucket: bucket_name,
      Key: object_folder_name,
    })
    .promise();

  // upload file
  await s3
    .putObject({
      Bucket: bucket_name,
      Key: object_name,
      ACL: "public-read",
      // ACL을 지우면 전체 공개되지 않습니다.
      Body: fs.createReadStream(local_file_path),
    })
    .promise();

  res.render("upload");
});

router.get("/", async function (req, res, next) {
  let { Buckets } = await s3.listBuckets().promise();

  for (let bucket of Buckets) {
    console.log(bucket.Name);
  }
  res.render("upload");
});

module.exports = router;
