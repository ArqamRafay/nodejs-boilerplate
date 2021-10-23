const User = require('../models/User');
const Customer = require('../models/Customer');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const CustomerController = () => {
  const register = async (req, res) => {
    console.log('Custommer controller call')
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  // http://localhost:2017/public/loginCustomer
  // INSERT INTO `Customers`(`CustomerName`,`CustomerPassword`) VALUES ('Arqam', '12345')

  const Customerlogin = async (req, res) => {

    const { CustomerName, CustomerPassword } = req.body;
    console.log(req.body)
    if (CustomerName && CustomerPassword) {
      try {
        const _customer = await Customer
          .findOne({
            where: {
              CustomerName,
            },
          });

        if (!_customer) {
          return res.status(400).json({ msg: 'Bad Request: Customer not found' });
        }
        // if (bcryptService().comparePassword(password, user.password)) {
        const token = authService().issue({ id: _customer.CustomerName });
        return res.status(200).json({ token, _customer });
        // }
        // return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  // Get: http://localhost:2017/private/customers
  // Authorization : Bearer Token: ***
  const getAll = async (req, res) => {
    try {
      const _customer = await Customer.findAll();
      return res.status(200).json({ _customer });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  // return {
  //   register,
  //   Customerlogin,
  //   validate,
  //   getAll,
  // };
  return {
    Customerlogin,
    getAll
  };
};

module.exports = CustomerController;
