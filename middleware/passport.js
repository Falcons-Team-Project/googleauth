const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID =
  '438342612514 - dngfei0mfpu33tsehpie3lq9au716ejq.apps.googleusercontent.com;';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://darylmurenzi.netlify.app/',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    },
  ),
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
