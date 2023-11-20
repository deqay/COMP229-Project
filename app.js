const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./controllers/config');


const bcrypt = require('bcrypt');

const port=8080;
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.get('/', (req, res) => {
    res.json({ message: "Welcome to Visitara Website! Here you can, rate and review businesses! ." });
  });

  //server

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  