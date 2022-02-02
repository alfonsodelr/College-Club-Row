import { GetItemCommand, GetItemCommandInput, } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const getItem = async (params: GetItemCommandInput) => {
    try {
        var data = await ddbClient.send(new GetItemCommand(params))
        data.Item = data.Item // unmarshall(data.Item);
        return { ...data, params };
    } catch (error) {
        return { error, params }
    }
};

export { getItem }