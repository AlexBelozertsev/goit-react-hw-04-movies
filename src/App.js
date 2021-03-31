import React, {Suspense, lazy} from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './styles/base.scss';

import AppBar from './components/AppBar';
import routes from './routes';

const HomePage = lazy(() => import('./views/HomePage' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./views/MoviesPage' /* webpackChunkName: "movies-page" */));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */));
const PersonPage = lazy(() => import('./views/personPage' /* webpackChunkName: "person-page" */));

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={
      <Loader
        type="Puff"
        color="#3f51b5"
        height={80}
        width={80}
        timeout={3000}
      /> } >
      <Switch>
        <Route exact path={routes.homePage} component={HomePage} />
        <Route exact path={routes.moviesPage} component={MoviesPage} />
        <Route path={routes.movieDetailsPage} component={MovieDetailsPage} />
        <Route path={routes.personPage} component={PersonPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
