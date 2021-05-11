//Import modules
const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./admin/routeAdmin');
const authRoutes = require('./auth/routeAuth');
const newsRoutes = require('./news/routeNews');
const userRoutes = require('./user/routeUser');

const port = config.port;

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//   next();
// });

// app.use(bodyParser.json());

// Database Connection.
const db = mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS, PATCH");
  next();
});

app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   if (req.body.successMsg) {
//     console.log('should show successfully registered message')
//     res.render('index', { errorMsg: null, successMsg: req.body.successMsg, isLoggedIn: false });
//   } else {
//     res.render('index', { errorMsg: null, successMsg: null, isLoggedIn: false });
//   }
// });


//Defining all the routes
app.use('/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/users', userRoutes);

//Defining server port 
app.listen(port, () => console.log(`Server running on port ${port}`));