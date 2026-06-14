import envConfig from "../../../config/env.config.js";
import Client from "../../../lib/S3.client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const putObject = async (key: string, contentType: string) => {
  try {
    const command = new PutObjectCommand({
      Bucket:
        envConfig.AWS_BUCKET_NAME || "IMS-454034543634234323-ap-south-1-an",
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(Client, command, { expiresIn: 1800 }); // 1800 second = 30 minutes

    return url;
  } catch (error: any) {
    return new Error(error.message);
  }
};

export default putObject;

// example to use:-
// await putObject(`assignments/image-${Date.now()}.jpg`, "image/jpeg");
// output:
// url
// use postman and `put` request on that `url`
