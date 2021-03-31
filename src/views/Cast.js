import React, { Component } from 'react';
import '../styles/base.scss';
import movieApi from '../services/movieApi';
import routes from '../routes';
import { Link, withRouter } from 'react-router-dom';

class Cast extends Component {
    state = {
        cast: [],
    };

    async componentDidMount() {
        const type = this.props.location.hash.slice(1);
        const movieId = this.props.match.params.movieId;
        const queryResponse = query => movieApi.fetchCast(`${query}`, movieId);
        if (type === 'movie') {
            const responceMovieCast = await queryResponse('movie');
            this.setState({ cast: responceMovieCast });
        } else {
                const responceTVCast = await queryResponse('tv');
                this.setState({ cast: responceTVCast })
        }
    }
    
    render() {
        const { cast } = this.state;
        return (<>
            <ul>
                {cast.map(({profile_path, id, name, character}) => {
                    const castImg = `https://image.tmdb.org/t/p/w500${profile_path}`;
                    return <li key={id} className='list'>
                        <Link to={{
                            pathname: `${routes.castPage}/${name}`,
                            state: {
                                from: this.props.location,
                            },
                        }}>
                            {profile_path && <img src={castImg} alt={name} className='cast_img' />}
                            <div className='cast_descript'>
                                <h3>{name}</h3>
                                <h4 className='cast_character' >{character}</h4>
                            </div>
                        </Link>
                    </li> })}
            </ul>
        </>);
    }
}
 
export default withRouter(Cast);