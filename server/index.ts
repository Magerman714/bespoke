import path from 'path';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import 'dotenv/config';
import { SESSION_SECRET } from '../config';
import BikeRoutes from './routes/mapped-routes';
import { WeatherRoute } from './routes/weather-routes';
import reportRouter from './routes/report-routes';
import { UserContext } from '../client/src/Root';

interface User {
  id: number;
  email: string;
  name: string;
  thumbnail: string;
  weight: number;
  location_lat?: number;
  location_lng?: number;
}

//Authentication Imports
import '../auth';
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
//

const app = express();

//  Authentication Middleware
app.use(
  session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//  Authentication Routes
// 1. Sign-In Splash
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</div>');
});

// 2. Google endpoint
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// 3. Callback endpoint
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

// 4. Login Failure Route:
app.get('/auth/failure', (req, res) => {
  res.send('Unable to sign in!');
});

// 5. Login Success Route:
app.get('/protected', isLoggedIn, (req, res) => {
  res.redirect('/home');
});

// 6. Logout Route:
app.get('/logout', (req, res) => {
  req.logout(() => {
    if (req.session) {
      req.session.destroy(() => {
        alert('Now logged out');
      });
    }
  });
  res.redirect('/');
});

// 7. Provides user context to every part of the client
app.get('/auth/user', (req, res) => {
  const user = req.user;
  prisma.user
    .findFirst({
      where: user!,
    })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

// PATCH USER
app.put('/auth/user', (req, res) => {
  console.log(UserContext);
})

// Middleware
const CLIENT_PATH = path.resolve(__dirname, '../client/dist/');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;

//routes from individual files
app.use('/weather', WeatherRoute);

// Routes to be used
app.use('/bikeRoutes', BikeRoutes);
app.use('/reports', reportRouter);

// Render All Pages
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

//Listening
app.listen(PORT, () =>
  console.log(`App now listening for requests at: http://localhost:${PORT}`)
);
