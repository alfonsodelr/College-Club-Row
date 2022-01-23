import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

interface dbClientparams {
    accessKeyId: string,
    secretAccessKey: string,
    region: string,

}

const credencials: dbClientparams = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
}

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient(credencials);
export { ddbClient };

////attribute types sample
//reading:      https://www.dynamodbguide.com/anatomy-of-an-item/
//--------data----------------------
// {
//     "Name": { "S": "Alex DeBrie" },
//     "Age": { "N": "29" },
//     "Roles": { "L": [{ "S": "Admin" }, { "S": "User" }] }
// }
//-------------attribute----------------
// {
//     "Item": {
//         "Name": {
//             "S": "Alex DeBrie"
//         },
//         "Age": {
//             "N": "29"
//         },
//         "Roles": {
//             "L": [{ "S": "Admin" }, { "S": "User" }]
//         }
//     }
// }


