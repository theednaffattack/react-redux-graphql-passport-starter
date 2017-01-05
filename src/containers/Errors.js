import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { setError, dismissError } from '../actions/errors';

class Errors extends Component {

  render() {
    const { errors } = this.props;
    return (
      <div className="errors">
        {errors.map((error, i) => (
          <p key={i}>{error} <a onClick={this.props.handleDismissError.bind(this, i)}>[x]</a></p>
        ))}
        <Button bsStyle="primary" onClick={this.props.handleSetError.bind(this, `random error number ${Math.random()}`)}>Add an error</Button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetError: (message) => {
      dispatch(setError(message));
    },
    handleDismissError: (id) => {
      dispatch(dismissError(id));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Errors);
