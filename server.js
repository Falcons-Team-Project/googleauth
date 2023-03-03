const db = require('./models/index');
const { User } = require('./models/index');
// const User = db['User'];
const { BcryptUtil } = require('./utils/createPassword');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const app = require('./app');
const passport = require('passport');
const { googleCallBack } = require('./middleware/googleCallBack');

require('./middleware/passport');
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);
app.get('/google/callback', googleCallBack, async (req, res) => {
  const { given_name, email } = req.user;
  const googleUser = await User.findOne({ where: { email } });
  let userObject = {};
  if (googleUser) {
    const TOKEN = jwt.sign(
      { name: given_name, email: email },
      'this is my secret key',
    );
    userObject = { name: given_name, token: TOKEN };
    console.log('user is found');
  } else {
    const TOKEN = jwt.sign(
      { name: given_name, email: email },
      'this is my secret key',
    );
    const user = await User.create({
      username: given_name,
      email: email,
      password: await BcryptUtil.hash('password'),
      // password,
    });
    user.save();
    userObject = { name: given_name, token: TOKEN };
  }
  res.status(200).json({ userObject });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

(async () => {
  try {
    await db.sequelize
      .sync()
      .then(() => console.log('Successfully connected to the db'));
  } catch (error) {
    console.log('Error connecting to the db', error.message);
  }
})();
