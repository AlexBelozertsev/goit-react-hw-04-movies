import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../services/movieApi';
import routes from '../routes';

class HomeView extends Component {
    state = {
        movies: []
    }
    
    async componentDidMount() {
        const responceMovies = await movieApi.fetchTrending();
        this.setState({ movies: responceMovies });
    }

    render() {
        const { movies } = this.state;
        return (
        <>
            <h1>Trending Today</h1>
            <ul>
                {movies.map(movie =>
                    <li key={movie.id} className='list'>
                        <Link to={{
                            pathname: `${routes.moviesPage}/${movie.id}`,
                            state: {
                                from: this.props.location,
                            }
                        }}>
                            {movie.title}
                        </Link>
                </li> )}
            </ul>
        </>
        );
    }
};
 
export default HomeView;
