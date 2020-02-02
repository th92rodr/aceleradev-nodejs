// Integration Tests Scenarios for Cars API

const request = require('supertest');
const server = require('../src/server');
const { cleanDB, openDB, populateDB } = require('./utils');

beforeAll(() => cleanDB());
afterAll(() => cleanDB());

describe('The API on /v1/cars Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      CAR1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        car_model: 'Relâmpago Marquinhos',
        description: 'O carro mais dahora do mundo.',
        company: 'Disney',
        price: 'US$ 99.000,00',
        year: '2008',
        color: 'Vermelho BOLADO',
        image_url: 'Sem tempo, irmão.'
      },
      CAR1580216220549RD493: {
        created_at: '2020-01-28T12:57:00.550Z',
        updated_at: '2020-01-28T12:57:00.550Z',
        car_model: 'Herbie',
        description: 'Herbie, o meu fusca TURBINADO',
        company: 'Volkswagen',
        price: 'US$ 25.000,00',
        year: '1974',
        color: 'Branco com umas listras top',
        image_url: 'Sem tempo, irmão.'
      }
    });
  });

  afterAll(() => cleanDB());

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/v1/cars');

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toMatchObject(['total', 'data']);
  });

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/v1/cars');

    expect(res.body.total).toEqual(2);
    expect(typeof res.body.data).toBe('object');
  });

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1);

    const res = await request(server.app).get('/v1/cars');

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        CAR1580214599567RD121: {
          created_at: '2020-01-28T12:29:59.567Z',
          updated_at: '2020-01-28T12:29:59.567Z',
          car_model: 'Relâmpago Marquinhos',
          description: 'O carro mais dahora do mundo.',
          company: 'Disney',
          price: 'US$ 99.000,00',
          year: '2008',
          color: 'Vermelho BOLADO',
          image_url: 'Sem tempo, irmão.'
        },
        CAR1580216220549RD493: {
          created_at: '2020-01-28T12:57:00.550Z',
          updated_at: '2020-01-28T12:57:00.550Z',
          car_model: 'Herbie',
          description: 'Herbie, o meu fusca TURBINADO',
          company: 'Volkswagen',
          price: 'US$ 25.000,00',
          year: '1974',
          color: 'Branco com umas listras top',
          image_url: 'Sem tempo, irmão.'
        }
      }
    });
  });
});

describe('The API on /v1/cars/:carId Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      CAR1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        car_model: 'Relâmpago Marquinhos',
        description: 'O carro mais dahora do mundo.',
        company: 'Disney',
        price: 'US$ 99.000,00',
        year: '2008',
        color: 'Vermelho BOLADO',
        image_url: 'Sem tempo, irmão.'
      }
    });
  });

  afterAll(() => cleanDB());

  test('return 200 as status code and the correct requested data', async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/v1/cars/CAR1580214599567RD121');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      created_at: '2020-01-28T12:29:59.567Z',
      updated_at: '2020-01-28T12:29:59.567Z',
      car_model: 'Relâmpago Marquinhos',
      description: 'O carro mais dahora do mundo.',
      company: 'Disney',
      price: 'US$ 99.000,00',
      year: '2008',
      color: 'Vermelho BOLADO',
      image_url: 'Sem tempo, irmão.'
    });
  });

  test('return 404 as status code and that the data wasn`t found', async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/v1/cars/invalid');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      error: `The record invalid couldn't be found.`
    });
  });
});

describe('The API on /v1/cars Endpoint at POST method should...', () => {
  beforeAll(() => cleanDB());
  afterAll(() => cleanDB());

  test('return 201 as status code and the created record', async () => {
    expect.assertions(2);

    const res = await request(server.app)
      .post('/v1/cars')
      .send({
        car_model: 'Relâmpago Marquinhos',
        description: 'O carro mais dahora do mundo.',
        company: 'Disney',
        price: 'US$ 99.000,00',
        year: '2008',
        color: 'Vermelho BOLADO',
        image_url: 'Sem tempo, irmão.'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      car_model: 'Relâmpago Marquinhos',
      description: 'O carro mais dahora do mundo.',
      company: 'Disney',
      price: 'US$ 99.000,00',
      year: '2008',
      color: 'Vermelho BOLADO',
      image_url: 'Sem tempo, irmão.'
    });
  });
});

describe('The API on /v1/cars/:carId Endpoint at PATCH method should...', () => {
  beforeAll(() => {
    populateDB({
      CAR1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        car_model: 'Relâmpago Marquinhos',
        description: 'O carro mais dahora do mundo.',
        company: 'Disney',
        price: 'US$ 99.000,00',
        year: '2008',
        color: 'Vermelho BOLADO',
        image_url: 'Sem tempo, irmão.'
      }
    });
  });

  afterAll(() => cleanDB());

  test('return 200 as status code and the updated record', async () => {
    expect.assertions(2);

    const res = await request(server.app)
      .patch('/v1/cars/CAR1580214599567RD121')
      .send({
        color: 'Amarelo'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      car_model: 'Relâmpago Marquinhos',
      description: 'O carro mais dahora do mundo.',
      company: 'Disney',
      price: 'US$ 99.000,00',
      year: '2008',
      color: 'Amarelo',
      image_url: 'Sem tempo, irmão.'
    });
  });

  test('return 404 as status code and that the data wasn`t found', async () => {
    expect.assertions(2);

    const res = await request(server.app)
      .patch('/v1/cars/invalid')
      .send({
        color: 'Amarelo'
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      error: `The record invalid couldn't be found.`
    });
  });
});
