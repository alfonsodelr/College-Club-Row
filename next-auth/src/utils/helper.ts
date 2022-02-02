import axios from "axios"
import { ApiUserGETQueryParamType as GetUserParamType } from '../pages/api/apiParamType'
// import { unmarshall } from "@aws-sdk/util-dynamodb";

const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;


function generateDefaultUser(param: generateDefaultUserType) {
    var data: userType = {
        userID: param.userID,
        clubs: [],
        tasks: [],
        userName: param.legalName,
        legalName: param.legalName,
        role: [
            "member"
        ],
        email: param.email,
    }
    return data;
}

function varNameGenerator(str, timeStemp = true, time = Date.now()) {
    if (typeof str !== 'string') throw new Error("utils/helper.ts: param error.");
    var varname = str.replace(/[^a-zA-Z0-9]/g, "");
    if (!timeStemp)
        return varname;
    return (varname + time);
}

//Functional Programming helper funcitons
const Tap = (fn = console.log) => x => (fn(x), x);
const Pipe = (...fns) => fns.reduce((result, f) => (...args) => f(result(...args)));


function urlCleaner(str) {
    if (typeof str !== 'string') return "urlCleaner: str must be a string."
    var url = str.replace(/[^a-zA-Z0-9/]/g, "");
    return url.toLowerCase();
}

async function getUserProfile(userData: GetUserParamType) {
    const res = await axios.get(baseUrl + "/api/user/", { params: { ...userData } })
    let data: userType = res.data.Item
    return { data, status: res.status }
}

type userType = {
    userID: number | string,
    clubs: Array<string>,
    tasks: Array<string>,
    userName: string,
    legalName: string,
    role: Array<string>,
    email: string,
}

type generateDefaultUserType = {
    userID: string,
    email: string,
    legalName: string,
}

function validateRole(role: string) {
    const roles = ["member", "officer", "president", "adviser"]
    if (roles.includes(role)) return role;
    throw new Error("ValidateRole Error: role is not valid.");
}

export { varNameGenerator, Tap, Pipe, getUserProfile, generateDefaultUser, urlCleaner, validateRole }
export type { userType }