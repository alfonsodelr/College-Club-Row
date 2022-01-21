
// Import required AWS SDK clients and commands for Node.js
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./libs/ddbClient.js";



// // Set the parameters
// export const params = {
//     AttributeDefinitions: [
//         {
//             AttributeName: "Season", //ATTRIBUTE_NAME_1
//             AttributeType: "N", //ATTRIBUTE_TYPE
//         },
//         {
//             AttributeName: "Episode", //ATTRIBUTE_NAME_2
//             AttributeType: "N", //ATTRIBUTE_TYPE
//         },
//     ],
//     KeySchema: [
//         {
//             AttributeName: "Season", //ATTRIBUTE_NAME_1
//             KeyType: "HASH",
//         },
//         {
//             AttributeName: "Episode", //ATTRIBUTE_NAME_2
//             KeyType: "RANGE",
//         },
//     ]

// };



export const run = async () => {
    try {
        const data = await ddbClient.send(new ListTablesCommand({}));
        console.log(data, "\n \n \n ");
        console.log(data.TableNames.join("\n"));
        return data;
    } catch (err) {
        console.error(err);
    }
};
