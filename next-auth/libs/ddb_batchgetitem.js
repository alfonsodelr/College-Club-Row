// Import required AWS SDK clients and commands for Node.js
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/ddbClient.js";

// // Set the parameters
// export const params = {
//   RequestItems: {
//     TABLE_NAME: {
//       Keys: [
//         {
//           KEY_NAME_1: { N: "KEY_VALUE" },
//           KEY_NAME_2: { N: "KEY_VALUE" },
//           KEY_NAME_3: { N: "KEY_VALUE" },
//         },
//       ],
//       ProjectionExpression: "ATTRIBUTE_NAME",
//     },
//   },
// };

export const run = async (params) => {
    try {
        const data = await ddbClient.send(new BatchGetItemCommand(params));
        console.log("Success, items retrieved", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
