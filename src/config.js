/* eslint no-process-env: 0 */

require('dotenv').config();

const environment = ['NODE_ENV', 'JWT_SECRET', 'PORT'];

environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT
};
