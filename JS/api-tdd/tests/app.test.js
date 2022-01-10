const axios = require('axios').default;
const { appPort } = require('../config.js').microPort
const baseUrl = `http://127.0.0.1:${appPort}`
const { makeid } = require('./util.js')
const { Club } = require('../src/db/index.js');


beforeEach(() => {
    jest.useFakeTimers()
    jest.setTimeout(100000)
})
afterEach(() => {
    jest.clearAllTimers()
});

describe('Testing creating a club', () => {
    const name = makeid(5);
    test('should create a club, and get club name in the response', async () => {
        let response = await axios.post(`${baseUrl}/club`, { name })
        expect(response.status).toBe(200)
        expect(response.data.newClub.name).toBe(name)
    });

    test('should get the club and respond with id and name', async () => {
        let response = await axios.get(`${baseUrl}/club`, { data: { name: name } })
        expect.assertions(3)
        expect(response.status).toBe(200);
        ids = response.data.clubExist.id;
        expect(response.data.clubExist.id).toBeDefined()
        expect(response.data.clubExist.name).toBeDefined()
    });

    test('GET /club/all: will return total clubs', async () => {
        let numberOfClubs = await Club.count();
        let response = await axios.get(`${baseUrl}/club/all`)
        expect(response.status).toBe(200);

        let numberOfResponse = response.data.clubs.length
        expect(numberOfResponse).toEqual(numberOfClubs)
        expect.assertions(2)
    });

    test("should update a club info", async () => {
        let newName = makeid(6);
        let response = await axios.get(`${baseUrl}/club`, { data: { name: name } })
        let existingID = response.data.clubExist.id;
        let responsePatch = await axios.patch(`${baseUrl}/club`, { id: existingID, data: { name: newName } })
        expect(responsePatch.status).toBe(200);
        expect(responsePatch.data.name).toEqual(newName);

        expect.assertions(2)
    })

    test("should delete a club info", async () => {
        let name = makeid(7);
        let responseCreate = await axios.post(`${baseUrl}/club`, { name });
        let newId = responseCreate.data.newClub.id;

        let responseDelete = await axios.delete(`${baseUrl}/club`, { data: { id: newId } })
        expect(responseDelete.status).toBe(200);
        expect(responseDelete.data.id).toBe(newId);

        expect.assertions(2)
    })

    test("should handles wrong paramerter", async () => {
        //get

        //post

        //delete

        //update
    })

    test.todo("should return 422 for missing parameter")

})


//set this.data in beforeach() function to have global var
