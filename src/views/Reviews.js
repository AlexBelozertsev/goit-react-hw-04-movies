import React, { Component } from 'react';
import movieApi from '../services/movieApi';

class Review extends Component {
    state = {
        reviews: []
    };

    async componentDidMount() {
        const type = this.props.location.hash.slice(1);
        const movieId = this.props.match.params.movieId;
        const queryResponse = query => movieApi.fetchReview(`${query}`, movieId);
        if (type === 'movie') {
            const responceMovieReview = await queryResponse('movie');
            this.setState({ reviews: responceMovieReview });
        } else {
                const responceTVReview = await queryResponse('tv');
                this.setState({ reviews: responceTVReview })
        }
    }

    render() { 
        const { reviews } = this.state;
        return (<>
            {reviews.length
                ? <ul>
                    {reviews.map(review =>
                      <li key={review.id}>
                        <h4>{review.author}</h4>
                        <p>{review.content}</p>
                      </li> )}
                  </ul>
                : <p>We don't have any reviews for this movie</p>}
        </>);
    }
}
 
export default Review;