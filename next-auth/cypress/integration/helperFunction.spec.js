/// <reference types="cypress" />


import { validateRole } from "../../src/utils/helper"

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