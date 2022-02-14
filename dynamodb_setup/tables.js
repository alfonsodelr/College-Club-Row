
const CCR_club_form_TableParams = {
    AttributeDefinitions: [
        {
            AttributeName: "clubID",
            AttributeType: "S",
        },
        {
            AttributeName: "formID",
            AttributeType: "S",
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
    TableName: "CCR-club-form"
};


const CCR_user_TableParams = {
    AttributeDefinitions: [
        {
            AttributeName: "userID",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: "userID",
            KeyType: "HASH",
        }
    ],
    TableName: "CCR-user"
};


const CCR_club_TableParams = {
    AttributeDefinitions: [
        {
            AttributeName: "clubID",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: "clubID",
            KeyType: "HASH",
        }
    ],
    TableName: "CCR-club"
};


const CCR_user_form_TableParams = {
    AttributeDefinitions: [
        {
            AttributeName: "userID",
            AttributeType: "S",
        },
        {
            AttributeName: "formID",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: "userID",
            KeyType: "HASH",
        },
        {
            AttributeName: "formID",
            KeyType: "RANGE",
        },
    ],
    TableName: "CCR-user-form"
};


const paramsArr = [CCR_club_form_TableParams, CCR_club_TableParams, CCR_user_TableParams, CCR_user_form_TableParams]



export default paramsArr;