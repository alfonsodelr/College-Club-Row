import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient.js";

const scanTable = async (params: ScanCommandInput) => {
    try {
        const data = await ddbClient.send(new ScanCommand(params));
        return { ...data, params };
    } catch (error) {
        return { error, params }
    }
};

export { scanTable }
