import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes';
import '../../styles/base.scss';

const MoviesList = ({ movies, location }) => {
    return (
        <ul>
            {movies.map( movie => {
                const { backdrop_path, id, title, poster_path, media_type } = movie;
                const currentImg = backdrop_path ? backdrop_path : poster_path;
                const imgUrl = `https://image.tmdb.org/t/p/w500${currentImg}`;
                    return <li key={id} className='list'>
                        <Link to={{
                            pathname: `${routes.moviesPage}/${id}`,
                            hash: `${media_type}`,
                            state: {
                                from: location,
                            },
                        }}>
                            <img src={imgUrl} alt={title ? title : movie.name}/>
                            {title ? title : movie.name}
                        </Link>
                    </li>
                })}
        </ul>
    );
};

MoviesList.defaultProps = {
  searchMovie: '',
};

MoviesList.propTypes = {
  searchMovie: PropTypes.string,
};

export default withRouter(MoviesList);
