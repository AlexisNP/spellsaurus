const School = {
    "id": "/SchoolModel",
    "type": Object,
    "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "meta_school": { "type": "number" },
    },
    "required": ["name", "description"]
}

module.exports = School