const api_form_get_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
        formID: { type: "string" },
    },
    maxProperties: 2,
    required: ["clubID", "formID"],
}

const api_form_delete_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
        formID: { type: "string" },
    },
    maxProperties: 2,
    required: ["clubID", "formID"],
}


const api_form_post_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
        formID: { type: "string" },
        tags: {
            type: "array",
            items: { type: "object" },
            minItems: 1,
        },
    },
    maxProperties: 3,
    required: ["clubID", "formID", "tags"],
}


const api_form_patch_schema = {
    type: "object",
    properties: {
        Item: {
            type: "object",
            properties: {
                clubID: { type: "string" },
                formID: { type: "string" },
                data: {
                    type: "object",
                },
            },
            maxProperties: 3,
            required: ["clubID", "formID", "data"],
        }
    },
}


const api_club_post_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
        clubName: { type: "string" },
        formID: { type: "string" },
        officers: {
            type: "array", items: { type: "string" },
        },
        members: { type: "array", items: { type: "string" } },
        image: { type: 'string' },
        purpose: { type: 'string' },
        status: { type: "string" },
        term: {
            type: 'object',
            properties: {
                year: { type: "string" },
                semester: { type: "string" },
            }
        }
    },
    minProperties: 2,
    required: ["clubID", "clubName"],
    additionalProperties: true,
}

const api_club_get_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
    },
    maxProperties: 1,
    required: ["clubID",],
}

const api_user_post_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
        clubs: { type: "array", items: { type: "string" } },
        tasks: { type: "array", items: { type: "object" } },
        userName: { type: "string" },
        legalName: { type: "string" },
        role: { type: "array", items: { type: "string" } },
        email: { type: "string" },
    },
    required: ["userID", "legalName", "email"],
    minProperties: 3,
    additionalProperties: false,
}


const api_user_delete_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
    }
}

//userID is the only PK that is requred, but we should get all three: email, name, and userID 
//because if the user doesn't exist, api will need those three params to create user.
//email, name and useID are provided by GooglePrividor response at nextAuth.callbacks.jwt.user
const api_user_get_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
        legalName: { type: "string" },
        email: { type: "string" },
    },
    required: ["userID", "legalName", "email"],
    maxProperties: 3,
}

const api_user_role_post_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
        role: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
    },
    required: ["userID", "role"],
}

const api_club_patch_schema = {
    type: "object",
    properties: {
        clubID: { type: "string" },
        key: { type: "string" },
        value: { type: "string" },
        action: { type: "string" }
    },
    required: ["clubID", "key", "value", "action"],
    maxProperties: 4,
}

const api_form_userinput_post_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
        formID: { type: "string" },
        tags: {
            type: "array",
            items: { type: "object" },
            minItems: 1,
        },
    },
    required: ["userID", "formID", "tags"],
}



const api_form_userinput_get_schema = {
    type: "object",
    properties: {
        userID: { type: "string" },
        formID: { type: "string" },
    },
    required: ["userID", "formID"],
}

type sessionType = {
    name: string,
    email: string,
    picture: string,
    sub: string,
    profiles: {
        role: Array<string>,
        clubs: Array<string>,
        userID: string,
        tasks: Array<string>,
        userName: string,
        email: string,
        legalName: string
    },
    iat: number,
    exp: number,
    jti: string,
}



export {
    api_form_get_schema,
    api_form_post_schema,
    api_form_patch_schema,
    api_form_delete_schema,
    api_club_post_schema,
    api_club_get_schema,
    api_user_post_schema,
    api_user_get_schema,
    api_user_delete_schema,
    api_user_role_post_schema,
    api_club_patch_schema,
    api_form_userinput_post_schema,
    api_form_userinput_get_schema,
}

export type { sessionType }