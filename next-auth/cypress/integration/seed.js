
const sampleUsers = [
    {
        userID: "1",
        clubs: [],
        tasks: [],
        userName: "myUserName",
        legalName: "myLegalName",
        role: [
            "member"
        ],
        email: "362yase@gmail.com"
    },
    {
        userID: "11",
        clubs: [],
        tasks: [],
        userName: "myUserName",
        legalName: "myLegalName",
        role: [
            "member"
        ],
        email: "362yase@gmail.com"
    },
    {
        userID: "1111",
        clubs: [],
        tasks: [],
        userName: "myUserName",
        legalName: "myLegalName",
        role: [
            "member"
        ],
        email: "362yase@gmail.com"
    },
]


var sampleForm01 = [
    {
        clubID: "CLUB1233",
        formID: "FORM1246",
        tags: [{ a: "vv" }, { c: "b" }]
    }, {
        clubID: "CLUB1233",
        formID: "FORM1247",
        tags: [{ a: "vv" }, { c: "b" }]
    }, {
        clubID: "CLUB1233",
        formID: "FORM1248",
        tags: [{ a: "vv" }, { c: "b" }]
    }, {
        clubID: "CLUB1234",
        formID: "FORM1246",
        tags: [{ a: "vv" }, { c: "b" }]
    }
]

var apiClubAppendRoleData = [
    {
        key: "officers",
        value: "104142427804075574374",
        action: "append_role"
    }, {
        key: "advisor",
        value: "104142423",
        action: "append_role"
    }
]


var apiClubPostData = [
    {
        clubID: "111",
        clubName: "ags1",
        formID: "",
        members: [],
        officers: []
    },
    {
        clubID: "112",
        clubName: "ags2",
        formID: "",
        members: [],
        officers: []
    }, {
        clubID: "113",
        clubName: "ags3",
        formID: "",
        members: [],
        officers: []
    }, {
        clubID: "114",
        clubName: "ags4",
        formID: "",
        members: [],
        officers: []
    }, {
        clubID: "115",
        clubName: "ags5",
        formID: "",
        members: [],
        officers: []
    }
]

export { sampleUsers, sampleForm01, apiClubPostData, apiClubAppendRoleData }