import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import Button from '../Button';

class Form extends Component {
  state = {
    name: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    return (
      <>
        <form className='Form' onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              id={this.nameInputId}
              onChange={this.handleChange}
          />
          <Button type={'submit'} text={'Search'} />
        </form>
      </>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
