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


export { api_form_get_schema, api_form_post_schema, api_form_patch_schema, api_form_delete_schema }
