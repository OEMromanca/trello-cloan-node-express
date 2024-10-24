const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/userRoutes');
const { labelRouter } = require('./routes/labelRouters');
const { todoRouter } = require('./routes/todoRoutes');
const { csrfRouter } = require('./routes/csrfRoutes');
const cookieParser = require('cookie-parser');
const csrfMiddleware = require('./middlewares/csrfMiddleware');
require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://trello-clone-0ln5.onrender.com',
    'https://trello-clone-react.onrender.com'
  ],  
  allowedHeaders: ['Content-Type', 'X-CSRF-Token'],

  credentials: true,  
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', csrfRouter);
app.use('/users', userRouter);
app.use('/labels', labelRouter);
app.use('/todos', todoRouter);


app.listen(port,  () => {
  console.log(`Server is running at port ${port}`);
});
