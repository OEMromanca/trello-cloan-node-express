const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/userRoutes');
const { labelRouter } = require('./routes/labelRouters');
const { todoRouter } = require('./routes/todoRoutes');
const { csrfRouter } = require('./routes/csrfRoutes');
const cookieParser = require('cookie-parser');
require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  

app.use(cors({
  origin: 'http://localhost:5173/',  
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/labels', labelRouter);
app.use('/todos', todoRouter);
app.use('/api', csrfRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at port ${port}`);
});
