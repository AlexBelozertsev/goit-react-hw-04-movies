import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../styles/base.scss';
import movieApi from '../services/movieApi';
import Button from '../components/Button';
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
        const type = this.props.location.hash.slice(1);
        const { movieId } = this.props.match.params;
        const queryResponse = query => movieApi.fetchMovieById(`${query}`, movieId);
        if (type === 'movie') {
            const responceMovie = await queryResponse('movie');
            const { title, overview, genres, poster_path, release_date, vote_average } = responceMovie;
            this.setState({ title, overview, genres, poster_path, release_date, vote_average });
        } else {
            const responceTV = await queryResponse('tv');
                const { name, overview, genres, poster_path, first_air_date, vote_average } = responceTV;
                this.setState({ title: name, overview, genres, poster_path, release_date: first_air_date, vote_average });
        }
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
            <Button type={'button'} text={'Go Back'} onClick={this.handleGoBack} />
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
                        hash: `${this.props.location.hash.slice(1)}`,
                        state: {
                             ...this.props.location.state
                        }
                    }}>
                        <Button type={'button'} text={'Cast'} />
                    </Link>
                    <Link to={{
                        pathname: `${url}/reviews`,
                        hash: `${this.props.location.hash.slice(1)}`,
                        state: {
                            ...this.props.location.state
                        }
                    }}>
                        <Button type={'button'} text={'Reviews'} />
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