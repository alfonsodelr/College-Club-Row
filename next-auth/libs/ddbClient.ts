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