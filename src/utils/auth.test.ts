import request from 'supertest'
beforeEach(() => {
    jest.resetModules()
})

describe('GET /test_auth', function() {
    it('responds with 401 when unauthenticated', (done) => {
        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .get('/api/test_auth')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, _res) => {
                if (err) return done(err)
                done()
            })
    });

    it('responds with 200 when authenticated', (done)=> {

        jest.doMock('./auth', () => ({
            ...(jest.requireActual('./auth')),
            __esModule: true,
            authCheck: (_err: any, _req: any, _res: any, next: any) => {
                // console.error("test")
                // req["auth"] = {sub: "test"}
                next()
            }
        }))
        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .get('/api/test_auth')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, _res) => {
                if (err) return done(err)
                done()
            })
    })
});
