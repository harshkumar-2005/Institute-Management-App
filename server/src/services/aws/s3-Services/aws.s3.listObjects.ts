import envConfig from "../../../config/env.config.js";
import Client from "../../../lib/S3.client.js";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const getObjectList = async (prefix: string) => {
  const bucket =
    envConfig.AWS_BUCKET_NAME || "IMS-454034543634234323-ap-south-1-an";
  const params = {
    Bucket: bucket,
    Prefix: prefix, // folder structure `cse/assignmen/sem2/`
  };

  try {
    const command = new ListObjectsV2Command(params);
    const response = await Client.send(command);

    if (!response.Contents) {
      throw new Error("No file exist or Folder does not exist.");
    }

    // Loop through and display the files
    response.Contents.forEach((file) => {
      console.log(`File Name: ${file.Key} (Size: ${file.Size} bytes)`);
    });
  } catch (err: any) {
    return new Error(err.message);
  }
};

export default getObjectList;

// example:-
// getObjectList("assignments/");
// output:-
// File Name: assignments/ (Size: 0 bytes)
// File Name: assignments/image-1781457914329.jpg (Size: 8806 bytes)
// File Name: assignments/image-1781457998190.jpg (Size: 8806 bytes)
