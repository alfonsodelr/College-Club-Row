const request = require("supertest")
const app = require('../src/app')
const { Club } = require('../src/db/index')


let clubData1 = { name: "AGS" }
const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;


describe('create a club', () => {
    test('should able to post a club', async () => {

        await request(app)
            .post('/club')
            .expect('Content-Type', /json/)
            .send(clubData1)
            .expect(200)
            .expect((res) => {
                id = res.body.uuid;
                expect(regexUUID.test(res.body.id)).toBe(true)
            })
    })

    // test('should be in the database', async () => {
    //     let clubExist = await Club.findOne({
    //         raw: true,
    //         where: { id: id },
    //     });


    // })
})

// it("should get a club", async function () {
//     return await request(app)
//         .get('/club')
//         .expect('Content-Type', /json/)
//         .expect(200)

// })


it("404 for undefined routes ", async function () {
    return await request(app).get('/sldfkj').expect(404)
})