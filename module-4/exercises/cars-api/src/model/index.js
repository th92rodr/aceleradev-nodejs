const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

const schema = require('./schema');

const openDB = () => require(`../../data/database.${env}.json`);

const updateDB = (data) => {
  const pathname = path.join(__dirname, `../../data/database.${env}.json`);

  try {
    const stringifiedData = JSON.stringify(data, null, 2);
    return fs.writeFileSync(pathname, stringifiedData, 'utf8');
  } catch (err) {
    return `Couldn't update database.${env}.json`;
  }
};

const cars = {
  findAll: () => Promise.resolve(openDB()),

  findById: (id) =>
    new Promise((resolve) => {
      const db = openDB();
      return resolve(db[id]);
    }),

  create: (data) =>
    new Promise((resolve) => {
      const db = openDB();
      const id =
        'CAR' + new Date().getTime() + 'RD' + (Math.random() * 1000).toFixed();
      db[id] = Object.assign(
        { created_at: new Date(), updated_at: new Date() },
        schema,
        data
      );

      updateDB(db);

      return resolve(db[id]);
    }),

  update: (data, id) =>
    new Promise((resolve) => {
      const db = openDB();

      if (!db[id]) {
        return resolve(null);
      }

      db[id] = Object.assign({ ...db[id] }, data, { updated_at: new Date() });

      return resolve(db[id]);
    }),

  destroy: (id) =>
    new Promise((resolve) => {
      const db = openDB();

      if (db[id]) {
        delete db[id];
        updateDB(db);
        return resolve({});
      }

      return resolve(null);
    })
};

module.exports = { cars };
