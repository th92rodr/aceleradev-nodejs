const db = require('../db/index');

const env = process.env.NODE_ENV || 'development';

const cars = {
  createTable: () => {
    const query = `
    CREATE TABLE IF NOT EXISTS cars_dev (
      id INT AUTO_INCREMENT PRIMARY KEY,
      car_model VARCHAR(255),
      description VARCHAR(255),
      company VARCHAR(255),
      price FLOAT,
      year INT,
      color VARCHAR(255),
      image_url VARCHAR(255)
    );
    `;
    db.query(query)
      .then((response) => {
        console.log('RES ', response);
      })
      .catch((error) => {
        console.log('ERRRRROR ', error);
      });
  },

  findAll: () => {
    const query = `SELECT * FROM cars_dev;`;
    return db.query(query);
  },

  findById: (id) => {
    const query = `
      SELECT * 
      FROM cars_dev
      WHERE id = ${id}
      ;`;

    return db.query(query);
  },

  create: (data) => {
    const {
      car_model,
      description,
      company,
      price,
      year,
      color,
      image_url
    } = data;
    const query = `
      INSERT INTO cars_dev (car_model, description, company, price, year, color, image_url)
      VALUES ('${car_model}', '${description}', '${company}', '${price}', '${year}', '${color}', '${image_url}')
      ;`;

    return db.query(query);
  },

  update: (data, id) => {
    const {
      car_model,
      description,
      company,
      price,
      year,
      color,
      image_url
    } = data;
    const query = `
      UPDATE cars_dev
      SET  
      car_model = '${car_model}',
      description = '${description}',
      company = '${company}',
      price = '${price}',
      year = '${year}',
      color = '${color}',
      image_url = '${image_url}'
      WHERE id = ${id}
      ;`;

    return db.query(query);
  },

  delete: (id) => {
    const query = `
      DELETE FROM cars_dev
      WHERE id = ${id}
      ;`;

    return db.query(query);
  }
};

module.exports = cars;
