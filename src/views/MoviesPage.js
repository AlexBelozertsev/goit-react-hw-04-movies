import React, { Component } from 'react';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';

class MoviesPage extends Component {
    state = {
        searchMovie: '',
    }

    componentDidMount() {
        const { search, pathname } = this.props.location;
        if (pathname && search) {
            this.setState({ searchMovie: search.slice(7) });
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
