/// <reference types="cypress" />

import { putItem } from "../../libs/ddb_putitem.ts"
import { getItem } from "../../libs/ddb_getitem.ts"
import { ddbClient } from "../../libs/ddbClient.js"
import { sampleUsers, sampleForm01 } from "./seed.js"
// // cy.request('https://jsonplaceholder.typicode.com/comments').then((response) => {
// //   expect(response.status).to.eq(200)
// //   expect(response.body).to.have.length(500)
// //   expect(response).to.have.property('headers')
// //   expect(response).to.have.property('duration')
// // })
import { GetItemCommand, GetItemCommandInput, } from "@aws-sdk/client-dynamodb";


// @ts-check
describe('api/user', () => {
    const reset = () => {
        sampleUsers.forEach(user => { deleteUser(user.userID) })
    }

    const deleteUser = (body) => {
        return cy.request('DELETE', 'api/user', { userID: body })
    }

    const getUser = (query) => {
        return cy.request({
            method: 'GET',
            url: '/api/user',
            form: true,
            qs: query,
        })
    }

    afterEach(reset)

    it('posts users', () => {
        var user0 = sampleUsers[2];
        cy.request('POST', '/api/user', user0).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("params")
            expect(response.body).to.have.property("$metadata")
        })

        deleteUser(user0.userID)
    })


    it('gets a user, create if not exist', () => {
        var { userID, email, legalName } = sampleUsers[1];
        getUser({ userID, email, legalName }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("params")
            expect(response.body).to.have.property("$metadata")
            expect(response.body).to.have.property("Item")
        })
        deleteUser(userID)
    })
})

describe('api/form', () => {

    const reset = () => {
        sampleForm01.forEach(form => { deleteForm({ clubID: form.clubID, formID: form.formID }) })
    }

    const deleteForm = (body) => {
        return cy.request('DELETE', 'api/form', { ...body })
    }



    it('posts forms', () => {
        sampleForm01.forEach((form, index) => {
            cy.request('POST', '/api/form', form).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property("clubID")
                expect(response.body).to.have.property("formID")
                expect(response.body).to.have.property("$metadata")
            })
        })
    });

    it('gets forms', () => {
        sampleForm01.forEach((form, index) => {
            cy.request({
                method: 'GET',
                url: '/api/form',
                form: true,
                qs: { clubID: form.clubID, formID: form.formID },
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property("clubID")
                expect(response.body).to.have.property("formID")
                expect(response.body).to.have.property("$metadata")
                expect(response.body).to.have.nested.property("Item.tags")
            })
        })

    });

    it.skip('deletes a form', () => {

    });


    it.skip('updates a form', () => {

    });

    after(() => {
        reset()
    })
});


//     it('posts a user',  () => {
//         var { userID, email, legalName } = sampleUsers[0]

//         cy.request('POST', '/api/user', sampleUsers[0]).then((response) => {
//             expect(response.status).to.eq(200)
//             expect(response.body).to.have.property("params")
//             expect(response.body).to.have.property("$metadata")

//         })

//         deleteUser({ userID })
//     })

//     it('gets a user, create if not exist', () => {
//         // var { userID, email, legalName } = sampleUsers[1];

//         // var GETparams = {
//         //     TableName: process.env.DB_USER_TABLENAME,
//         //     Key: {
//         //         userID: {
//         //             S: `${userID}`
//         //         }
//         //     },
//         // }
//         // getItem(GETparams).then(response => {
//         //     expect(response,).to.not.have.property("Item")
//         //     // expect(response).to.have.property("$metadata")
//         // })

//         // var getUserRes = getUser({ userID, email, legalName }).then(response => {
//         //     expect(response.status).to.eq(200);
//         //     expect(response.body).to.have.property("params")
//         //     expect(response.body).to.have.property("$metadata")
//         //     expect(response.body).to.have.property("Item")
//         // })
//         // console.log("getUserres: dat....", getUserRes);
//         // deleteItem({ userID })
//     })
// })


//  // cy.request(`/todos/${randomId}`)
//         //     .its('body')
//         //     .should('deep.eq', item)
//         // cy.request({
//         //     method: 'POST',
//         //     url: '/api/user',
//         //     form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
//         //     qs: {
//         //         userID,
//         //         email,
//         //         legalName
//         //     },
//         // })

//  // it('returns JSON', () => {
//     //     cy.request('/todos')
//     //         .its('headers')
//     //         .its('content-type')
//     //         .should('include', 'application/json')
//     // })

//     // it('loads 2 items', () => {
//     //     cy.request('/todos')
//     //         .its('body')
//     //         .should('have.length', 2)
//     // })

//     // it('loads the initial items', () => {
//     //     getItems()
//     //         .should('deep.eq', initialItems)
//     // })

//     // it('returns id + task objects', () => {
//     //     getItems()
//     //         .each((value) => {
//     //             return expect(value).to.have.all.keys('id', 'task')
//     //         })
//     // })
