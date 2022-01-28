import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";

const getItem = async (params: GetItemCommandInput) => {
    const data = await ddbClient.send(new GetItemCommand(params));
    return { ...data };
};

export { getItem }