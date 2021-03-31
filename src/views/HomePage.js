import React, { Component } from 'react';
import movieApi from '../services/movieApi';
import MoviesList from '../components/MoviesList';

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
        const {location} = this.props
        return (
            <>
                <h1>Trending Today</h1>
                <MoviesList movies={movies} location={location} />
            </>
        );
    }
};
 
export default HomeView;
