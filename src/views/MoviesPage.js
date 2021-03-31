import React, { Component } from 'react';
import queryString from 'query-string';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';
import movieApi from '../services/movieApi';

class MoviesPage extends Component {
    state = {
        searchMovie: '',
        movies: [],
    }

    componentDidMount() {
        const { search, pathname } = this.props.location;
        const searchParams = queryString.parse(search);
        if (pathname && search) {
            this.setState({ searchMovie: searchParams.query });
        }
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.searchMovie !== this.state.searchMovie) {
            const responce = await movieApi.fetchMovie(this.state.searchMovie);
            this.setState({ movies: responce.results });
        };
    };

    formSubmitHandler = data => {
        this.setState({ searchMovie: data.name });
        this.props.history.push({
            ...this.props.location,
            search: `?query=${data.name}`,
        });
    };

    render() {
        const { searchMovie, movies } = this.state;
        return (
            <>
                <Form onSubmit={this.formSubmitHandler} />
                {searchMovie && <MoviesList movies={movies} />}
            </>
        );
    }
};

export default MoviesPage;
