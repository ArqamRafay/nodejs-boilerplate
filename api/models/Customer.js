const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'Customers';

const Customer = sequelize.define('Customer', {
  CustomerName: {
    type: Sequelize.STRING,
    unique: true,
  },
  CustomerPassword: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Customer.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = Customer;
