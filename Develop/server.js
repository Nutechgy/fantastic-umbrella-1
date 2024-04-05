const express = require('express');
const routes = require('./routes');
const sequalize = require('./config/connection');// import sequelize connection
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});
