import request from 'supertest'

beforeEach(() => {
    jest.resetModules()
})


describe('POST /api/upload', function() {
    it('400s when file is not set', (done) => {
        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .post('/api/upload')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((_err, res) => {
                expect(res.body).toMatchObject({response: "No image attached"})
                done()
            })
    });

    it('400s when file is not image', (done) => {
        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .post('/api/upload')
            .attach('image', 'package.json')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((_err, res) => {
                expect(res.body).toMatchObject({response: "Invalid file type"})
                done()
            })
    });


    it('200s when file is set', (done) => {
        jest.doMock("../utils/file_storage", () => {
            return {
                __esModule: true,
                upload: {
                    single: () => ((req:any, _res:any, next: any)=> {
                        req.file = "file"
                        next()
                    })
                }
            }
        })

        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .post('/api/upload')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, _res) => {
                if (err) return done(err)
                done()
            })
    });
});
