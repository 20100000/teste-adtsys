import request from 'request';

describe("Test Init", () => {
    let server;
    let res = null;
    beforeAll(() => {
        server = require("../../app");
    });

    describe("Test Api Pokemon happy", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/pokemon/campinas", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);

               done();
            });
        });
        it("Status 200", () => {

            expect(data.status).toBe(200);
        });
        // console.log('res boby', data.body)

        it("Test Api data from Pokemon", () => {
            expect(data.body.pokemon).not.toBeUndefined();
        });

    });

    describe("Test Api Pokemon sad", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/pokemon/campinassssssssss", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);

                done();
            });
        });
        it("Status 500", () => {

            expect(data.status).toBe(500);
        });
        // console.log('res boby', data.body)

        it("Test Api data undefined", () => {
            expect(data.body.pokemon).toBeUndefined();
        });

    });


});