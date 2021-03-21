import React, { Component } from 'react';
import movieApi from '../services/movieApi';

class Review extends Component {
    state = {
        reviews: []
    };

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;
        const responceReview = await movieApi.fetchReview(movieId);
        this.setState({ reviews: responceReview });
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