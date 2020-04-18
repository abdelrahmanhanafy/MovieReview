const request = require('supertest');
const app = require('../main');
let makeEmail = () => {
    let randomEmail = ""
    let randomString = Math.random().toString(36).substring(7);
    randomEmail = randomString + "@gmail.com"
    return { re: randomEmail, rs: randomString };
}
let random = Math.random().toString(36).substring(2, 15);
describe('Users Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                email: makeEmail().re,
                password: `123456`,
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('email')
    })
    it("shouldn't create a new user due to no email entered", async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                password: `123456`,
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new user due to no password entered", async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                email: "test@gmail.com"
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new user due to repeated email", async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                email: `test@gmail.com`,
                password: `123456`,
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new user due to wrong email format", async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                email: makeEmail().rs,
                password: `123456`,
            })
        expect(res.statusCode).toEqual(400)
    })
    it('should login', async () => {
        const result = await request(app)
            .post('/api/users/signup')
            .send({
                email: makeEmail().re,
                password: `123456`,
            })
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: result.body.email,
                password: `123456`,
            })
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't login due to no email entered", async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                password: `123456`,
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't login due to no password entered", async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: `test@gmail.com`
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't login due to wrong password", async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: `test@gmail.com`,
                password: `1234567`
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't login due to no email found with the email enterd", async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: `test2@gmail.com`,
                password: `123456`
            })
        expect(res.statusCode).toEqual(400)
    })
})
describe('Movies GET Endpoint', () => {
    it('should get all movies', async () => {
        const res = await request(app)
            .get('/api/movies/')
            .send()
        expect(res.statusCode).toEqual(200)
    })
})
describe('Movies POST Endpoint', () => {
    it('should create a new movie', async () => {
        const res = await request(app)
            .post('/api/movies/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ') // Works.
            .send({
                name: random,
                genre: `cartoon`,
                year: `2000`
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })
    it("shouldn't create a new movie due to no token found -Unathorized", async () => {
        const res = await request(app)
            .post('/api/movies/')
            .send({
                name: `spiderman`,
                genre: `cartoon`,
                year: `2000`
            })
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't create a new movie due to no name entered", async () => {
        const res = await request(app)
            .post('/api/movies/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ') // Works.
            .send({
                genre: `cartoon`,
                year: `2000`
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new movie due to no genre entered", async () => {
        const res = await request(app)
            .post('/api/movies/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ') // Works.
            .send({
                name: `spiderman`,
                year: `2000`
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new movie due to no year entered", async () => {
        const res = await request(app)
            .post('/api/movies/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ') // Works.
            .send({
                name: `spiderman`,
                genre: `cartoon`
            })
        expect(res.statusCode).toEqual(400)
    })
})
describe('Movies PATCH Endpoint', () => {
    it('should edit a movie', async () => {
        const res = await request(app)
            .patch('/api/movies/5e9a8adae9473b4900895ee2')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ year: "2001" })
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't edit a movie due to wrong id", async () => {
        const res = await request(app)
            .patch('/api/movies/5e9a8adae9473b4900895ee')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ year: "2001" })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't edit a movie due to no id sent in the url", async () => {
        const res = await request(app)
            .patch('/api/movies/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ year: "2001" })
        expect(res.statusCode).toEqual(404)
    })
    it("shouldn't edit a movie due to no token found", async () => {
        const res = await request(app)
            .patch('/api/movies/5e9a8adae9473b4900895ee2')
            .send({ year: "2001" })
        expect(res.statusCode).toEqual(403)
    })
})
describe('Reviews GET Endpoint', () => {
    it('should get all reviews', async () => {
        const res = await request(app)
            .get('/api/reviews/')
            .send()
        expect(res.statusCode).toEqual(200)
    })
})
describe('Reviews POST Endpoint', () => {
    it('should create a new review', async () => {
        const res = await request(app)
            .post('/api/reviews/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({
                movieId: `5e9a8adae9473b4900895ee2`,
                rate: `7`
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('rate')
    })
    it("shouldn't create a new review due to no token found -Unathorized", async () => {
        const res = await request(app)
            .post('/api/movies/')
            .send({
                movieId: `5e9a8adae9473b4900895ee2`,
                rate: `7`
            })
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't create a new review due to no movieId entered", async () => {
        const res = await request(app)
            .post('/api/reviews/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({

                rate: `7`
            })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't create a new review due to no rate entered", async () => {
        const res = await request(app)
            .post('/api/reviews/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({
                movieId: `5e9a8adae9473b4900895ee2`

            })
        expect(res.statusCode).toEqual(400)
    })

})
describe('Reviews PATCH Endpoint', () => {
    it('should edit a review', async () => {
        const res = await request(app)
            .patch('/api/reviews/5e9a71fc1077df1040deb901')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ rate: "5" })
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't edit a review due to wrong id", async () => {
        const res = await request(app)
            .patch('/api/reviews/5e9a71fc1077df1040deb90')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ rate: "5" })
        expect(res.statusCode).toEqual(400)
    })
    it("shouldn't edit a review due to wrong id", async () => {
        const res = await request(app)
            .patch('/api/reviews/')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWE4NDllZTY2ZTZiNDViNDdlMWU4OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxODYzNTN9.mZyaWa0bE8bsVGfj37pqxWaGRP63EhqFMClcbsUoevQ')
            .send({ rate: "5" })
        expect(res.statusCode).toEqual(404)
    })
    it("shouldn't edit a review due to no token sent", async () => {
        const res = await request(app)
            .patch('/api/reviews/')
            .send({ rate: "5" })
        expect(res.statusCode).toEqual(403)
    })

})
