import { UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";


// //Sample parameters
// const params = {
//     TableName: process.env.DB_CLUB_FORM_TABLENAME,
//     Key: {
//         clubID: "CLUB1232",
//         formID: "FORM1241",
//     },
//     // Define expressions for the new or updated attributes
//     UpdateExpression: "set tags.a = :t", // For example, "'set Title = :t, Subtitle = :s'"
//     ExpressionAttributeValues: {
//         ":t": { "S": "75" },
//     },
//     ReturnValues: "ALL_NEW"
// };

const updateItem = async (params: UpdateItemCommandInput) => {
    try {
        const data = await ddbClient.send(new UpdateItemCommand(params));
        console.log("Success - item added or updated", data);
        return { ...data, params };
    } catch (error) {
        console.log("ddb_updateitem: ", error.message);
        return { error, params }
    }
};

export { updateItem }

/*

update-expression ::=
    [ SET action [, action] ... ]
    [ REMOVE action [, action] ...]
    [ ADD action [, action] ... ]
    [ DELETE action [, action] ...]

more about dynamodb expression: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.html
more about update-expresison: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html

*/