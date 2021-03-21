import React, { Component } from 'react';
import movieApi from '../services/movieApi';
import '../styles/base.scss';

class Cast extends Component {
    state = {
        cast: [],
    };

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;
        const responceCast = await movieApi.fetchCast(movieId);
        this.setState({ cast: responceCast });
    }
    
    render() {
        const { cast } = this.state;
        return (<>
            <ul className='cast' >
                {cast.map(person => {
                    const castImg = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
                    return <li key={person.id}>
                        <img src={castImg} alt={person.name} />
                        <div className='cast_descript'>
                            <h3>{person.name}</h3>
                            <h4 className='cast_character' >{person.character}</h4>
                        </div>
                    </li> })}
            </ul>
        </>);
    }
}
 
export default Cast;