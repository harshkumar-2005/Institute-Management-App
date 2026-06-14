import envConfig from "../../../config/env.config.js";
import Client from "../../../lib/S3.client.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const getObject = async (key: string) => {
  try {
    const bucket =
      envConfig.AWS_BUCKET_NAME || "IMS-454034543634234323-ap-south-1-an";

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key || "lol1.jpg",
    });

    const url = await getSignedUrl(Client, command, { expiresIn: 1800 }); // 1800 second = 30 minutes
    return url;
  } catch (err: any) {
    return new Error(err.message);
  }
};

export default getObject;

// example:
// getObject("lol.jpg");
// output:
// https://IMS-41024-ap-south-1-an.s3.ap-south-1.amazonaws.com/lol1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWTNK2FFYGDKMD7NS%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=&X-Amz-Expires=1800&X-Amz-Signature=-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject
