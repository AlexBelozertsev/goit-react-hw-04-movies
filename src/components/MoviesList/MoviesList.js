import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes';
import '../../styles/base.scss';
import movieApi from '../../services/movieApi';

class MoviesList extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        const responce = await movieApi.fetchMovie(this.props.searchMovie);
        this.setState({ movies: responce.results });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchMovie !== this.props.searchMovie) {
            this.componentDidMount();
        }
    }

    render() { 
        const { movies } = this.state;
        return (
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
    );
    }
};

MoviesList.defaultProps = {
  searchMovie: '',
};

MoviesList.propTypes = {
  searchMovie: PropTypes.string,
};

export default withRouter(MoviesList);
