const request = require('supertest');
const server = require('../src/server');
const { cleanDB, openDB, populateDB } = require('./utils');

beforeAll(() => cleanDB());
afterAll(() => cleanDB());

describe('The API on /api/animals Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      ANI1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      },
      ANI1580216220549RD493: {
        created_at: '2020-01-28T12:57:00.550Z',
        updated_at: '2020-01-28T12:57:00.550Z',
        pet_name: 'Tereza Fernandes Montalvão',
        description: 'Gatinha mais perfeita desse mundão redondo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Fêmea',
        color: 'Malhada',
        image_url: ''
      }
    });
  });

  afterAll(() => cleanDB());

  test(`return 200 as status code and have 'total' and 'data' as properties`, async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/api/animals');

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toMatchObject(['total', 'data']);
  });

  test('return the right number of items and an object with all items', async () => {
    expect.assertions(2);

    const res = await request(server.app).get('/api/animals');

    expect(res.body.total).toEqual(2);
    expect(typeof res.body.data).toBe('object');
  });

  test(`return the 'data' property with all items from DB`, async () => {
    expect.assertions(1);

    const res = await request(server.app).get('/api/animals');

    expect(res.body).toMatchObject({
      total: 2,
      data: {
        ANI1580214599567RD121: {
          created_at: '2020-01-28T12:29:59.567Z',
          updated_at: '2020-01-28T12:29:59.567Z',
          pet_name: 'Belchior Fernandes Montalvão',
          description: 'Gatinho mais fofinho desse mundo',
          animal_type: 'Gato',
          pet_age: '6 Meses',
          sex: 'Macho',
          color: 'Branco Malhado',
          image_url: ''
        },
        ANI1580216220549RD493: {
          created_at: '2020-01-28T12:57:00.550Z',
          updated_at: '2020-01-28T12:57:00.550Z',
          pet_name: 'Tereza Fernandes Montalvão',
          description: 'Gatinha mais perfeita desse mundão redondo',
          animal_type: 'Gato',
          pet_age: '6 Meses',
          sex: 'Fêmea',
          color: 'Malhada',
          image_url: ''
        }
      }
    });
  });
});

describe('The API on /api/animals/:id Endpoint at GET method should...', () => {
  beforeAll(() => {
    populateDB({
      ANI1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      }
    });
  });

  afterAll(() => cleanDB());

  test(`return 200 as status code and the item founded`, async () => {
    expect.assertions(2);
    const res = await request(server.app).get(
      '/api/animals/ANI1580214599567RD121'
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      created_at: '2020-01-28T12:29:59.567Z',
      updated_at: '2020-01-28T12:29:59.567Z',
      pet_name: 'Belchior Fernandes Montalvão',
      description: 'Gatinho mais fofinho desse mundo',
      animal_type: 'Gato',
      pet_age: '6 Meses',
      sex: 'Macho',
      color: 'Branco Malhado',
      image_url: ''
    });
  });

  test(`return 404 as status code and error message if the item doesn't exists and couldn't be found`, async () => {
    expect.assertions(2);
    const res = await request(server.app).get('/api/animals/invalid');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      error: `The record invalid couldn't be found.`
    });
  });
});

describe('The API on /api/animals Endpoint at POST method should...', () => {
  afterEach(() => cleanDB());

  test(`return 201 as status code and return the item added`, async () => {
    expect.assertions(2);
    const res = await request(server.app)
      .post('/api/animals')
      .send({
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      pet_name: 'Belchior Fernandes Montalvão',
      description: 'Gatinho mais fofinho desse mundo',
      animal_type: 'Gato',
      pet_age: '6 Meses',
      sex: 'Macho',
      color: 'Branco Malhado',
      image_url: ''
    });
  });

  test(`save on database the new item added`, async () => {
    expect.assertions(1);

    const res = await request(server.app)
      .post('/api/animals')
      .send({
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      });

    const database = openDB();
    const record = Object.values(database).find(
      (item) => item.pet_name === 'Belchior Fernandes Montalvão'
    );

    expect(record).toMatchObject({
      pet_name: 'Belchior Fernandes Montalvão',
      description: 'Gatinho mais fofinho desse mundo',
      animal_type: 'Gato',
      pet_age: '6 Meses',
      sex: 'Macho',
      color: 'Branco Malhado',
      image_url: ''
    });
  });
});

describe('The API on /api/animals/:id Endpoint at PATCH method should...', () => {
  beforeEach(() =>
    populateDB({
      ANI1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      }
    })
  );
  afterEach(() => cleanDB());

  test(`return 200 as status code and return the item changed`, async () => {
    expect.assertions(2);

    const res = await request(server.app)
      .patch('/api/animals/ANI1580214599567RD121')
      .send({
        sex: 'Femea',
        color: 'Vermelho'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      pet_name: 'Belchior Fernandes Montalvão',
      description: 'Gatinho mais fofinho desse mundo',
      animal_type: 'Gato',
      pet_age: '6 Meses',
      sex: 'Femea',
      color: 'Vermelho',
      image_url: ''
    });
  });

  test(`return 404 as status code and error message if the item doesn't exists and couldn't be updated`, async () => {
    expect.assertions(2);

    const res = await request(server.app)
      .patch('/api/animals/DOESNTEXISTS')
      .send({
        sex: 'Femea',
        color: 'Vermelho'
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      error: `The record DOESNTEXISTS couldn't be found.`
    });
  });

  test(`save on database the item changed`, async () => {
    expect.assertions(1);

    const res = await request(server.app)
      .patch('/api/animals/ANI1580214599567RD121')
      .send({
        sex: 'Femea',
        color: 'Vermelho'
      });

    const database = openDB();
    const record = database['ANI1580214599567RD121'];

    expect(record).toMatchObject({
      pet_name: 'Belchior Fernandes Montalvão',
      description: 'Gatinho mais fofinho desse mundo',
      animal_type: 'Gato',
      pet_age: '6 Meses',
      sex: 'Femea',
      color: 'Vermelho',
      image_url: ''
    });
  });
});

describe('The API on /api/animals/:id Endpoint at DELETE method should...', () => {
  beforeEach(() =>
    populateDB({
      ANI1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        pet_name: 'Belchior Fernandes Montalvão',
        description: 'Gatinho mais fofinho desse mundo',
        animal_type: 'Gato',
        pet_age: '6 Meses',
        sex: 'Macho',
        color: 'Branco Malhado',
        image_url: ''
      }
    })
  );
  afterEach(() => cleanDB());

  test(`return 204 as status code to a item deleted successfully`, async () => {
    expect.assertions(1);

    const res = await request(server.app).delete(
      '/api/animals/ANI1580214599567RD121'
    );

    expect(res.statusCode).toEqual(204);
  });

  test(`return 404 as status code and error message if the item doesn't exists and couldn't be deleted`, async () => {
    expect.assertions(2);

    const res = await request(server.app).delete('/api/animals/DOESNTEXISTS');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      error: `The record DOESNTEXISTS couldn't be found.`
    });
  });

  test(`remove from database the item that should be deleted`, async () => {
    expect.assertions(1);

    const res = await request(server.app).delete(
      '/api/animals/ANI1580214599567RD121'
    );

    const database = openDB();
    const record = database['ANI1580214599567RD121'];

    expect(record).toBeUndefined();
  });
});
