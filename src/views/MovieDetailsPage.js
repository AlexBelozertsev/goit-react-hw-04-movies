import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../styles/base.scss';
import movieApi from '../services/movieApi';
import routes from '../routes';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "casts-page" */));
const Reviews = lazy(() => import('./Reviews' /* webpackChunkName: "reviews-page" */));

class MovieDetailsPage extends Component {
    state = {
        title: null,
        overview: null,
        genres: null,
        poster_path: null,
        release_date: null,
        vote_average: null,
    }

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;
        const responceMovie = await movieApi.fetchMovieById(movieId);
        const { title, overview, genres, poster_path, release_date, vote_average } = responceMovie;
        this.setState({ title, overview, genres, poster_path, release_date, vote_average });
    }

    handleGoBack = () => {
        const { location, history } = this.props;
        if (location.state && location.state.from) {
            return history.push(location.state.from);
        } else (history.push(routes.moviesPage))
    }

    render() { 
        const { title, overview, genres, poster_path, release_date, vote_average } = this.state;
        const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const url = this.props.match.url;
        const path = this.props.match.path;
        return (<>
            <button type='button' className='button' onClick={this.handleGoBack}>Go Back</button>
            <section>
                <div>
                    {poster_path && <img src={imgUrl} alt={title}/>}
                </div>
                <div className='description' >
                    <h1>{title}({release_date && release_date.slice(0, 4)})</h1>
                    <p>User Score: {vote_average}</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h4>Genres</h4>
                    {genres && <p>{genres.map(genre=>` ${genre.name}, `)}</p>}
                </div>
            </section>
            <section className='add_section' >
                <h5>Addicional information</h5>
                <div>
                    <Link to={{
                        pathname: `${url}/cast`,
                        state: {
                             ...this.props.location.state
                        }
                    }}>
                        <button type='button' className='button'>Cast</button>
                    </Link>
                    <Link to={{
                        pathname: `${url}/reviews`,
                        state: {
                            ...this.props.location.state
                        }
                    }}>
                        {<button type='button' className='button'>Reviews</button>}
                    </Link>
                </div>
            </section>
            <Suspense fallback={<h2>load</h2>}>
                <Switch>
                <Route path={`${path}/cast`} component={Cast} />
                <Route path={`${path}/reviews`} component={Reviews} />
                </Switch>
            </Suspense>
        </>);
    }
}
 
export default MovieDetailsPage;