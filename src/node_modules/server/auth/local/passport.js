/* Local authentication strategy configuration */

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
  /* verify callback - find, if user with given credentials exists
   * done(null, user) called on success,
   * done(null, false, {msg}) in case of auth failure OR done(err) in case of exception
   */
  User.findOneAsync({
    email: email.toLowerCase(),
  })
    .then(user => {
      if(!user) {
        return done(null, false, {
          message: 'This email is not registered.',
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if(authError) {
          return done(authError);
        }
        if(!authenticated) {
          return done(null, false, {message: 'This password is not correct.'});
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(User, config) {
  passport.use(new LocalStrategy(function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
