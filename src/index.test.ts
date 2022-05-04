import request from 'supertest'
import {createServer} from './server'


describe('GET /', function() {
    it('responds with json', (done) => {
        request(createServer())
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({'message': 'Home'})
                done()
            })
    });
});
