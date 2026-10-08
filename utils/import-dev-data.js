const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../models/tourModel');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connection successfully');
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  await Tour.create(tours);
  console.log('Data successfully loaded!');
  process.exit();
};

const deleteData = async () => {
  await Tour.deleteMany();
  console.log('Data successfully deleted!');
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
