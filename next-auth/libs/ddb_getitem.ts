import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";

// Set the parameters
// export const params = {
//   TableName: "TABLE_NAME", //TABLE_NAME
//   Key: {
//     KEY_NAME: { N: "KEY_VALUE" },
//   },
//   ProjectionExpression: "ATTRIBUTE_NAME",
// };

const getItem = async (params: GetItemCommandInput) => {
    const data = await ddbClient.send(new GetItemCommand(params));
    if (data.Item === undefined) return { ...data, key: params.Key, error: "Item Not Found" }
    return data;
};

export { getItem }