import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import FakeUserStore from '../models/user';

dotenv.config();

export default function passportConfig(passport) {
  const userStore = new FakeUserStore();

  const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  };

  passport.use('local-signup', new LocalStrategy(strategyOptions, (req, username, password, done) => {
    // Check if username is already taken.
    // If so, return done(error).
    // If not, save a new user and call done(null, newUser)

    if (userStore.userExists(username)) {
      return done(null, false, { signupMessage: 'That username is already taken' });
    }

    if (typeof password !== 'string') {
      return done(null, false, { signupMessage: 'No password provided' });
    }

    const newUser = userStore.addUser(username, password);

    return done(null, newUser);
  }));

  passport.use('local-login', new LocalStrategy(strategyOptions, (req, username, password, done) => {
    if (!userStore.userExists(username)) {
      return done(null, false, { loginMessage: 'Bad username' });
    }

    if (!userStore.validateUser(username, password)) {
      return done(null, false, { loginMessage: 'Bad password' });
    }

    return done(null, userStore.getUser(username));
  }));

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SECRET,
    // TODO: add issuer & audience?
    // https://github.com/themikenicholson/passport-jwt#configure-strategy
  };

  const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    if (userStore.userExists(payload.username)) {
      return done(null, userStore.getUser(payload.username));
    }

    return done(null, false);
  });

  passport.use('jwt', jwtLogin);
}
