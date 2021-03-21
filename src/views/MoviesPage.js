import React, { Component } from 'react';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';

class MoviesPage extends Component {
    state = {
        searchMovie: '',
    }
    
    formSubmitHandler = data => {
        this.setState({ searchMovie: data.name });
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
