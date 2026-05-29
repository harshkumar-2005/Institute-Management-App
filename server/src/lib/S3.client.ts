import { S3Client } from "@aws-sdk/client-s3";
import envConfig from "../config/env.config.js";

const Client = new S3Client({
  region: envConfig.AWS_REGION,
  credentials: {
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID!,
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY!,
  },
});

export default Client;
