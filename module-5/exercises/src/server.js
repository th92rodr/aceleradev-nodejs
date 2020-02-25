const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cars_model = require('./model/index');

app.use(bodyParser.json());

app.get('/v1/createtable', async (req, res, next) => {
  cars_model.createTable();
  res.status(200).json('OK');
});

app.get('/v1/cars', async (req, res, next) => {
  try {
    const cars = await cars_model.findAll();
    res.status(200).json({ total: cars.length, data: cars });
  } catch (error) {
    console.error('ERRRRROR ', error);
    res.status(500).json({ error });
  }
});

app.get('/v1/cars/:carId', async (req, res, next) => {
  const { carId } = req.params;
  try {
    const car = await cars_model.findById(carId);
    if (car.length === 0) res.status(404).json({ message: 'Not Found' });
    res.status(200).json({ car });
  } catch (error) {
    console.error('ERRRRROR ', error);
    res.status(500).json({ error });
  }
});

app.post('/v1/cars', async (req, res, next) => {
  try {
    const car = await cars_model.create(req.body);
    res.status(201).json({ car });
  } catch (error) {
    console.error('ERRRRROR ', error);
    res.status(500).json({ error });
  }
});

app.patch('/v1/cars/:carId', async (req, res, next) => {
  const { carId } = req.params;
  try {
    const car = await cars_model.update(req.body, carId);
    res.status(201).json({ car });
  } catch (error) {
    console.error('ERRRRROR ', error);
    res.status(500).json({ error });
  }
});

app.delete('/v1/cars/:carId', async (req, res, next) => {
  const { carId } = req.params;
  try {
    const car = await cars_model.delete(carId);
    res.status(201).json({ car });
  } catch (error) {
    console.error('ERRRRROR ', error);
    res.status(500).json({ error });
  }
});

module.exports = { app };
