describe('My First Test', () => {
    it('visits the home page', () => {
        expect(true).to.equal(true)
        cy.visit('http://localhost:3000/')
    })
})