// Import required AWS SDK clients and commands for Node.js
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/ddbClient.js";

// // Set the parameters
// export const params = {
//   RequestItems: {
//     TABLE_NAME: [
//       {
//         PutRequest: {
//           Item: {
//             KEY: { N: "KEY_VALUE" },
//             ATTRIBUTE_1: { S: "ATTRIBUTE_1_VALUE" },
//             ATTRIBUTE_2: { N: "ATTRIBUTE_2_VALUE" },
//           },
//         },
//       },
//       {
//         PutRequest: {
//           Item: {
//             KEY: { N: "KEY_VALUE" },
//             ATTRIBUTE_1: { S: "ATTRIBUTE_1_VALUE" },
//             ATTRIBUTE_2: { N: "ATTRIBUTE_2_VALUE" },
//           },
//         },
//       },
//     ],
//   },
// };

export const run = async (params) => {
    try {
        const data = await ddbClient.send(new BatchWriteItemCommand(params));
        console.log("Success, items inserted", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
