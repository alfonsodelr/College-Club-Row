import { GetItemCommand, GetItemCommandInput, } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient.js";

const getItem = async (params: GetItemCommandInput) => {
    try {
        var data = await ddbClient.send(new GetItemCommand(params))
        return { ...data, params };
    } catch (error) {
        return { error, params }
    }
};

export { getItem }