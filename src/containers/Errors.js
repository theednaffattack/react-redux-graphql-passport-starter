import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { setError, dismissError } from '../actions/errors';

class Errors extends Component {

  handleDismissError = (index) => {
    const { dispatch } = this.props;
    dispatch(dismissError(index));
  }

  handleSetError = (message) => {
    const { dispatch } = this.props;
    dispatch(setError(message));
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="errors">
        {errors.map((error, i) => (
          <p key={i}>{error} <a onClick={this.handleDismissError.bind(this, i)}>[x]</a></p>
        ))}
        <Button bsStyle="primary" onClick={this.handleSetError.bind(this, `random error number ${Math.random()}`)}>Add an error</Button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps)(Errors);
