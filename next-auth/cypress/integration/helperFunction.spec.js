/// <reference types="cypress" />


import { validateRole, validateRole_club, getClubRoleFromSession } from "../../src/utils/helper"

describe('HelperFunction validateRole', () => {
    before(() => {
        // check if the import worked correctly
        expect(validateRole, 'validateRole').to.be.a('function')
    })

    it('return role on correct role ', () => {
        const roles = ["member", "officer", "president", "adviser"]
        roles.forEach(role => {
            expect(validateRole(role)).to.equal(role)
        })
    })

    it("throws error when wrong roles are given", () => {
        var err = function () { validateRole("wrongRole") };

        expect(err).to.throw("ValidateRole Error: role is not valid.", "did not throw error with msg='ValidateRole Error: role is not valid.]'");
    })
})


describe('HelperFunction validateRole_club', () => {
    before(() => {
        // check if the import worked correctly
        expect(validateRole_club, 'validateRole_club').to.be.a('function')
    })

    it('return role on correct role ', () => {
        const roles = ["officer", "president", "adviser"]
        roles.forEach(role => {
            expect(validateRole_club(role)).to.equal(role)
        })
    })

    it("throws error when wrong roles are given", () => {
        var err = function () { validateRole_club("wrongRole") };

        expect(err).to.throw("ValidateRole_club Error: club role is not valid.", "did not throw error with msg='ValidateRole_club Error: club role is not valid.'");
    })
})


describe('HelperFunction getClubRoleFromSession', () => {
    before(() => {
        expect(getClubRoleFromSession, 'validateRole_club').to.be.a('function')
    })

    it('checks if params is array type', () => {
        let response = getClubRoleFromSession("not array");
        expect(response).to.have.property("error")
    })

    it("returns {role, numOfRole} for correct response and egnores 'member' role", () => {
        let roleArr = ["member", "officer@111", "president@222"]
        let response = getClubRoleFromSession(roleArr);
        console.log(response)
        expect(response).to.have.property("role");
        expect(response).to.have.property("numOfRole");
        expect(response.numOfRole).to.be.eq(2);
        expect(response.role).to.be.instanceOf(Array);
        expect(response.role).to.have.lengthOf(2);
        expect(response.numOfRole).to.be.eq(2)
    })
})
