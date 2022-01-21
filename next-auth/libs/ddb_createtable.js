// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
// import { ddbClient } from "./libs/ddbClient.js";
import { ddbClient } from "./ddbClient";

export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "clubID",
            AttributeType: "N",
        },
        {
            AttributeName: "formID",
            AttributeType: "N",
        },
    ],
    KeySchema: [
        {
            AttributeName: "clubID",
            KeyType: "HASH",
        },
        {
            AttributeName: "formID",
            KeyType: "RANGE",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    TableName: "CCR-club-form",
    StreamSpecification: {
        StreamEnabled: false,
    },
};


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

//this create table funciton has not been tested or ran yet.
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

