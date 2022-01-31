// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";

const putItem = async (params: PutItemCommandInput) => {
    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        return { ...data, params };
    } catch (error) {
        ////throws: ConditionalCheckFailedException if conditioanl expressions are not met.
        return { error, params }
    }
};

export { putItem }