
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const claims = require('./routes/claims');

app.use('/api/v1/claims', claims);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const connectDB = require('./config/db');

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/api/v1/laims' , (req, res) => {
  console.log(req.body, "ghello");
})
