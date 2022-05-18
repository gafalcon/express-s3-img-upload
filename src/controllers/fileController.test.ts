import request from 'supertest'
import { mockAuth } from '../tests/mocks'
import {ImageRepository} from '../tests/repositories'

beforeEach(() => {
    jest.resetModules()
})

mockAuth()

describe('POST /api/upload', function() {
    it('400s when file is not set', (done) => {
        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .post('/api/images/upload')
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
            .post('/api/images/upload')
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
                        req.file = {"location": "test_url"}
                        next()
                    })
                }
            }
        })
        jest.doMock("../repositories/image_repository", () => ImageRepository)

        const {createServer} = require('../server')
        const server = createServer()
        request(server)
            .post('/api/images/upload')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({response: {user: "mock_user", url: "test_url"}})
                done()
            })
    });
});


describe("GET /api/images", () => {
    it("Returns all stored images", (done) => {
        jest.doMock("../repositories/image_repository", () => ImageRepository)
        const {createServer} = require('../server')
        const server = createServer()

        request(server)
            .get('/api/images')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({images: [
                    {url: "test_url", user: "test_user"}
                ]})
                done()
            })
    })
})
