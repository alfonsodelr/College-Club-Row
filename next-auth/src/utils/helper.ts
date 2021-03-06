import axios from "axios"
import { ApiUserGETQueryParamType as GetUserParamType } from '../pages/api/apiParamType'
import { ValidateFunction } from 'ajv'
import { v4 as uuidv4 } from 'uuid';

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


/*!
 * @desc  Checks if a role is valid 
 * @param  {role:string}   role to validate.
 * @return {role|Error}    role string or and error.
 */
function validateRole(role: string) {
    const roles = Object.freeze(["member", "officer", "president", "adviser"])
    if (roles.includes(role)) return role;
    throw new Error("ValidateRole Error: role is not valid.");
}

/*!
 * @desc  Validates Role for /club pages
 * @param  {role:string}   role to validate.
 * @return {role|Error}    role string or and error.
 */
function validateRole_club(role: string) {
    const roles = Object.freeze(["officer", "president", "adviser"])
    if (roles.includes(role)) return role;
    throw new Error("ValidateRole_club Error: club role is not valid.");
}



/*!
 * @desc  gets club role from user profiles.role array.
 * @param  {role:Array<string>}   role array.
 * @return {role, numOfRole}    roles and number of club roles a user have.
 */
function getClubRoleFromSession(roleArr: Array<string>) {
    if (roleArr.constructor.name !== "Array") return { error: "getClubRoleFromSession: params is invalid." }
    var clubID: string;
    var rol: Array<Array<string>> = [];
    var numOfRole: number = 0;

    roleArr.forEach(role => {
        if (role === "member") return;
        if (/member|officer|president|/gm.test(role)) {
            rol.push(role.split("@"));
            numOfRole += 1;
        }
    });
    return { role: rol, numOfRole };
}


/*!
 * @desc  gets club name given clubID
 * @param  {clubID: number}   
 * @return {clubName: string | false}    
 */
function getClubName(clubID: number) {
    const clublist = getClubs()
    if (clublist[clubID]) return clublist[clubID];
    return false;
}


/*!
 * @desc  returns club object with clibID as key and clubName as value
 * @param  {none}   
 * @return { {clubID: clubName, clubID: clubName ...} }    
 */
function getClubs() {
    return { 111: "ags" }
}

/*!
 * @desc  gets clubID given club name
 * @param  {clubName: string}   
 * @return {clubID: number | false}    
 */
function getClubID(clubName: string) {
    const clublist = getClubs()
    for (var id in clublist) {
        if (clublist[id] === clubName) return id;
    }
    return false;
}

const validateSchema = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("Invalid_Param_Schema"); return data }



/*!
 * @error handler for API requests:
 * @param  {req:apiRequest, error: Error}   
 * @return {req.url + " " + req.method + ": " + error.message}     
 */
function errorHandler(req, error) {
    if (error.message === "Invalid_Param_Schema") {
        return (req.url + " " + req.method + ": " + error.message)
    }

    if (req.method === "GET", error.message === "No value defined: {}") {
        return (req.url + " " + req.method + ": " + error.message + " Not Found.")
    }

    if (req.url === "/api/club" && req.method === "PATCH" && error.message.includes("ConditionalCheckFailedException")) {
        return { error: req.url + " " + req.method + "condition failed" + ": " + error.message + " Not Found.", status: 302 }
    }


    return ("unexpected_error: " + req.url + " " + req.method + ": " + error.message)
}

function genereateID(type) {
    if (type === "formID") {
        return uuidv4();
    }
    return uuidv4();
}

export {
    varNameGenerator,
    Tap,
    Pipe,
    getUserProfile,
    generateDefaultUser,
    urlCleaner,
    validateRole,
    getClubRoleFromSession,
    validateRole_club,
    getClubName,
    getClubID,
    validateSchema,
    errorHandler,
    genereateID,
}
export type { userType } //I should export types from ./shcema.ts only.!!!! fix later