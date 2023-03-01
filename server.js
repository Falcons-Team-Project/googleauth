const db = require('./models/index');
const app = require('./app');

app.get('/', (req, res) => {
  res.send({ message: 'Hello' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

(async () => {
  try {
    await db.sequelize
      .sync({ force: false, alter: true })
      .then(() => console.log('Successfully connected to the db'));
  } catch (error) {
    console.log('Error connecting to the db', error.message);
  }
})();
