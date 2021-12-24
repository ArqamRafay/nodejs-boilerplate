const publicRoutes = {
  // 'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'POST /loginCustomer': 'CustomerController.Customerlogin',
};
module.exports = publicRoutes;
