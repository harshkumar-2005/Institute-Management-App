import Client from "../../../lib/S3.client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import envConfig from "../../../config/env.config.js";

const deleteObject = async (key: string) => {
  const params = {
    Bucket: envConfig.AWS_BUCKET_NAME || "IMS-454034543634234323-ap-south-1-an",
    Key: key || "lol4.jpg",
  };

  try {
    const data = await Client.send(new DeleteObjectCommand(params));
    return { success: "true", message: "Deleted Successfully", data: data };
  } catch (err: any) {
    return { success: "false", message: err.message };
  }
};

export default deleteObject;

// example:-
// await deleteObject("lol1.jpg");
// output:-
// {
//   success: 'true',
//   message: 'Deleted Successfully',
//   data: {
//     '$metadata': {
//       httpStatusCode: 204,
//       requestId: 'D74PYWXC8G',
//       extendedRequestId: 'Y7JTxwxJkCCcsYvPMxZwneOA',
//       cfId: undefined,
//       attempts: 1,
//       totalRetryDelay: 0
//     }
//   }
// }
