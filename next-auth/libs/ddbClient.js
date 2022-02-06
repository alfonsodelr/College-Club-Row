import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = "REGION"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
    // accessKeyId: process.env.ACCESS_KEY,
    // secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    endpoint: "http://localhost:8000",
});
export { ddbClient };



/* //------------------------DOC----------------------------
1. all DDB commands should return either a  {response.data, params} or a typeOf {Error, params}

2. user 'docker run --name mydynamo -p 8000:8000 amazon/dynamodb-local' to run local db.

3. run database contaier by:  docker-compose up -d dynamodb && docker logs -f my-dynamodb

*/
