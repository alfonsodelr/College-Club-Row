import { DynamoDBClient, CreateTableCommand, DeleteTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import paramsArr from "./tables.js";

const ddbClient = new DynamoDBClient({
    // accessKeyId: process.env.ACCESS_KEY,
    // secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    //for dynamodb local, you must run a docker image with: docker run --name mydynamo -p 8000:8000 amazon/dynamodb-local
    endpoint: "http://localhost:8000",
});






//---to delete a table-----
// deleteTable("CCR-club-form")

//// ---create all tables-----
ddb_createTables(paramsArr);










async function ddb_createTables(paramsArr, append = false) {
    try {
        var listTable = await listTables();
        if (listTable.TableNames.length !== 0 && append === false) {
            console.log("Please clean up the existing tables before you create new ones, or pass the 'append=true' flag to bypass.")
            console.log(`Tables: ${listTable.TableNames}`)
            return;
        }

        paramsArr.forEach(async (param) => {
            paramKeyFilter(param);
            const data = await ddbClient.send(new CreateTableCommand(param));
            console.log("Table Created", data);
        })
        return;
    } catch (err) {
        console.log("Error", err);
    }
};




async function deleteTable(tableName) {
    var params = {
        TableName: tableName,
    };

    try {
        const data = await ddbClient.send(new DeleteTableCommand(params));
        console.log("Success, table deleted", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
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

async function listTables() {
    try {
        const data = await ddbClient.send(new ListTablesCommand({}));
        console.log(data, "\n \n \n ");
        console.log(data.TableNames.join("\n"));
        return data;
    } catch (err) {
        console.error(err);
    }
};

