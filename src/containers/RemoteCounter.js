import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { Row, Button } from 'react-bootstrap';

import { setError } from '../actions/errors';

const SUBSCRIPTION_QUERY = gql`
  subscription onCountUpdated {
    countUpdated {
      amount
      errorMessage
    }
  }
`;

class Counter extends React.Component {

  constructor(args) {
    super(args);
    this.subscription = null;
  }

  // componentDidUpdate won't work on the first error!
  componentWillUpdate(nextProps) {
    if (nextProps.count && nextProps.count.errorMessage) {
      this.props.handleSetError(nextProps.count.errorMessage);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: SUBSCRIPTION_QUERY,
        variables: {},
        updateQuery: (previousResult, { subscriptionData }) => {
          const newAmount = subscriptionData.data.countUpdated.amount;
          const newErrorMessage = mutationResult.data.addCount.errorMessage;
          return update(previousResult, {
            count: {
              amount: {
                $set: newAmount,
              },
              errorMessage: {
                $set: newErrorMessage || null,
              },
            },
          });
        },
      });
    }
  }

  render() {
    const { loading, count, addCount } = this.props;

    if (loading) {
      return (
        <Row>
          Loading...
        </Row>
      );
    }

    return (
      <Row>
        <div>
          Current count, is {count.amount}.
          This is being stored server-side in the database
          and using Apollo subscription for real-time updates.
        </div>
        <br />
        <Button bsStyle="primary" onClick={addCount(1)}>
          Click to increase count
        </Button>
      </Row>
    );
  }
}

Counter.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  count: React.PropTypes.object,
  updateCountQuery: React.PropTypes.func,
  addCount: React.PropTypes.func.isRequired,
  subscribeToMore: React.PropTypes.func.isRequired,
  handleSetError: React.PropTypes.func.isRequired,
};

const AMOUNT_QUERY = gql`
  query getCount {
    count {
      amount
      errorMessage
    }
  }
`;

const ADD_COUNT_MUTATION = gql`
  mutation addCount(
    $amount: Int!
  ) {
    addCount(amount: $amount) {
      amount
      errorMessage
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetError: (message) => {
      dispatch(setError(message));
    },
  };
};

export default compose(
  graphql(AMOUNT_QUERY, {
    props({ data: { loading, count, subscribeToMore } }) {
      return { loading, count, subscribeToMore };
    },
  }),
  graphql(ADD_COUNT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      addCount(amount) {
        return () => mutate({
          variables: { amount },
          updateQueries: {
            getCount: (prev, { mutationResult }) => {
              const newAmount = mutationResult.data.addCount.amount;
              const newErrorMessage = mutationResult.data.addCount.errorMessage;
              return update(prev, {
                count: {
                  amount: {
                    $set: newAmount,
                  },
                  errorMessage: {
                    $set: newErrorMessage || null,
                  },
                },
              });
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addCount: {
              __typename: 'Count',
              amount: ownProps.count.amount + 1,
            },
          },
        });
      },
    }),
  }),
  connect(null, mapDispatchToProps),
)(Counter);
