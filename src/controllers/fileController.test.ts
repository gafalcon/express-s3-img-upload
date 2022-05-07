import request from 'supertest'

import {createServer} from '../server'
const server = createServer()


describe('POST /api/upload', function() {
    it('400s when file is not set', (done) => {
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
        jest.mock("../utils/file_storage", () => {
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
        request(server)
            .post('/api/upload')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => {
                done()
            })
    });
});
