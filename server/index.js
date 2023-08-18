require('dotenv').config()
const express = require('express')
const sequelize= require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileUpload = require('express-fileupload')

const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');
const userRouter = require('./routes/userRouter');
const typeRouter = require('./routes/typeRouter');
const BookRouter = require('./routes/BookRouter');
const ratingRouter = require('./routes/ratingRouter');
const cartRoutes = require('./routes/cartRouter');


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/user', userRouter);
app.use('/api/type', typeRouter);
app.use('/api/book', BookRouter);
app.use('/api/cart', cartRoutes);
app.use('/api/rating', ratingRouter);


app.use(errorHandler)
const start = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      console.log(`Server is running on http://localhost:${PORT}`);
    } catch (e) {
      console.log(e);
    }
  };
  start();