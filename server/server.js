const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);

// Додайте ваші маршрути та логіку тут

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
