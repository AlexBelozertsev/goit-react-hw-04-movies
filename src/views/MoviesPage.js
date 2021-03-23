import React, { Component } from 'react';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';
import queryString from 'query-string';

class MoviesPage extends Component {
    state = {
        searchMovie: '',
    }

    componentDidMount() {
        const { search, pathname } = this.props.location;
        const searchParams = queryString.parse(search);
        if (pathname && search) {
            this.setState({ searchMovie: searchParams.query });
        }
    }

    formSubmitHandler = data => {
        this.setState({ searchMovie: data.name });
        this.props.history.push({
            ...this.props.location,
            search: `?query=${data.name}`,
        });
    };

    render() {
        const { searchMovie } = this.state;
        return (
            <>
                <Form onSubmit={this.formSubmitHandler} />
                {searchMovie && <MoviesList searchMovie={searchMovie} />}
            </>
        );
    }
};

export default MoviesPage;
