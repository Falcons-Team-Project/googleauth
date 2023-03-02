const passport = require('passport');
const googleCallBack = passport.authenticate('google', {
  failureRedirect: '/auth/google',
});

module.exports = {
  googleCallBack,
};
