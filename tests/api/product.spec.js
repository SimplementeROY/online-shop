const request = require('supertest')
const app = require('../../src/app')
const mongoose = require('mongoose')
const Product = require('../../src/models/products.model')

describe('Api de  productos', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/online-shop')
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('GET /api/products', () => {
        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();

        }, 3000);
        it('Deberia recibir un status 200', async () => {
            expect(response.statusCode).toBe(200);
        })

        it('Deberia responder con  un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Deberia responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })

    describe('POST /api/products', () => {
        let response;
        const body = { name: 'Estuche', descrption: 'Estuche', department: 'test', price: 14, stock: 200, available: true }
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);

        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' })
        })
        it('Deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Deberia  devolver un _id correcto', () => {
            expect(response.body._id).toBeDefined();
        })

        it('Los valores enviados son los mismos que se guardan', () => {
            expect(response.body.name).toBe(body.name)
            expect(response.body.description).toBe(body.description)
            expect(response.body.department).toBe(body.department)
            expect(response.body.stock).toBe(body.stock)
            expect(response.body.available).toBe(body.available)
            expect(response.body.price).toBe(body.price)
        })
    })

    describe('DELETE /api/products/<PRODUCT_ID>', () => {
        let response;
        let product;
        beforeAll(async () => {
            const body = { name: 'Estuche', description: 'Estuche', department: 'test', price: 14, stock: 200, available: true };
            product = await Product.create(body);
            response = await request(app).delete(`/api/products/${product.id}`).send(body);
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id);
        })
        it('Deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('No deberia existir el producto en la BBDD', async () => {
            expect(await Product.findById(product._id)).toBe(null);
        })
    })

    describe('PUT /api/products/<PRODUCT_ID>', () => {
        let response;
        let product;
        beforeAll(async () => {
            const body = { name: 'Estuche', description: 'Estuche', department: 'test', price: 14, stock: 200, available: true };
            product = await Product.create(body)
            response = await request(app).put(`/api/products/${product._id}`).send({
                price: 30,
                stock: 300
            });
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id)
        })

        it('Deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Los valores que modificamos se cambian en la BBDD', () => {
            expect(response.body.price).toBe(30);
            expect(response.body.stock).toBe(300);
        })
    })
})