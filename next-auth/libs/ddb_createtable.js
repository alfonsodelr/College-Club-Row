// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
// import { ddbClient } from "./libs/ddbClient.js";
// import { ddbClient } from "./ddbClient";
import { ddbClient } from "./ddbClient.js";


function paramKeyFilter(params) {
    if (!params.AttributeDefinitions || !params.KeySchema || !params.TableName) {
        throw Error({ msg: "paramKeySchemaFilter: param AttributeDefinitions, KeySchema, TableName required." })
    }
    if (!params.ProvisionedThroughput) {
        params.ProvisionedThroughput = {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    }
    if (!params.StreamSpecification) {
        params.StreamSpecification = {
            StreamEnabled: false,
        }
    }
}

export const ddb_createTable = async (params) => {
    try {
        paramKeyFilter(params);
        const data = await ddbClient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
