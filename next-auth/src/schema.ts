const getItemSchema = {
    type: "object",
    properties: {
        Key: {
            type: "object",
            properties: {
                clubID: { S: { type: "string" } },
                formID: { S: { type: "string" } }
            }
        }

    },
    required: ["clubID"],
    additionalProperties: false
}


export { getItemSchema }
