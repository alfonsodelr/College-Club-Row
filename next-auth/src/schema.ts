const api_form_get_schema = {
    type: "object",
    properties: {
        Key: {
            type: "object",
            properties: {
                clubID: {
                    type: "object",
                    properties: {
                        S: { type: "string", nullable: false }
                    }
                },
                formID: {
                    type: "object",
                    properties: {
                        S: { type: "string", nullable: false }
                    }
                }
            },
            required: ["clubID", "formID"],
            additionalProperties: false,
        }
    },
}

export { api_form_get_schema }
