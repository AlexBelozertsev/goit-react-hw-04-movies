import React, { Component } from 'react';
import movieApi from '../services/movieApi';
import routes from '../routes';
import MoviesList from '../components/MoviesList';
import Button from '../components/Button';

class personPage extends Component {
    state = {
        name: null,
        popularity: null,
        profile_path: null,
        known_for: null,
    }

    async componentDidMount() {
        const { personName } = this.props.match.params;
        const responcePerson = await movieApi.fetchPerson(personName);
        const { popularity, profile_path, name, known_for } = responcePerson[0];
        this.setState({ popularity, profile_path, name, known_for });
    };

    handleGoBack = () => {
        const { location, history } = this.props;
        if (location.state && location.state.from) {
            return history.push(location.state.from);
        } else (history.push(routes.moviesPage))
    }

    render() {
        const { popularity, profile_path, name, known_for } = this.state;
        const imgUrl = `https://image.tmdb.org/t/p/w500${profile_path}`;
        return (<>
            <Button type={'button'} text={'Go Back'} onClick={this.handleGoBack} />
            <section>
                <div>
                    {profile_path && <img src={imgUrl} alt={name}/>}
                </div>
                <div className='description' >
                    <h1>{name}</h1>
                    <p>Popularity: {popularity}</p>
                    <h4>Known for:</h4>
                    {known_for && <MoviesList movies={known_for} />}
                </div>
            </section>
        </>)
    }
}
 
export default personPage;