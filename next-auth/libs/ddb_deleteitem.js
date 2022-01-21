// Import required AWS SDK clients and commands for Node.js
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/ddbClient.js";

// // Set the parameters
// export const params = {
//   TableName: "CUSTOMER_LIST_NEWEST",
//   Key: {
//     CUSTOMER_ID: { N: "1" },
//   },
// };

export const run = async (params) => {
    try {
        const data = await ddbClient.send(new DeleteItemCommand(params));
        console.log("Success, item deleted", data);
        return data;
    } catch (err) {
        console.log("Error", err);
        if (err && err.code === "ResourceNotFoundException") {
            console.log("Error: Table not found");
        } else if (err && err.code === "ResourceInUseException") {
            console.log("Error: Table in use");
        }
    }
};
