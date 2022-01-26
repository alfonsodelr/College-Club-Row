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
        Item: {
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
    },
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
        formID: { type: "string" },
        clubName: { type: "string" }
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
        userID: { type: "number" },
        clubs: { type: "array", items: { type: "string" } },
        tasks: { type: "array", items: { type: "object" } },
        userName: { type: "string" },
        legalName: { type: "string" },
        role: { type: "array", items: { type: "string" } }
    },
    required: ["userID", "legalName"],
    minProperties: 2,
    additionalProperties: false,
}

const api_user_get_schema = {
    type: "object",
    properties: {
        userID: { type: "number" }
    },
    required: ["userID"],
    maxProperties: 1,

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
}