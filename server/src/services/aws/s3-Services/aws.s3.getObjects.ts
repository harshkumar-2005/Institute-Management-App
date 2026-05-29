import Client from "../../../lib/S3.client.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import envConfig from "../../../config/env.config.js";

const getObject = async (key: string) => {
  try {
    const bucket = envConfig.AWS_BUCKET_NAME || "IMS_BUCKET_ap-south-1-aws-arn::200:321:arns";
    
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key || "lol1.jpg",
    });

    const url = await getSignedUrl(Client, command, { expiresIn: 1800 }); // 1800 second = 30 minutes
    return url;
  } catch (error: any) {
    return new Error(error.message);
  }
};

export default getObject;