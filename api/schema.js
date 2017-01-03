import { merge } from 'lodash';
import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';
import { pubsub } from './subscriptions';

const rootSchema = [`

# Database counter
type Count {
  # Current amount
  amount: Int!
  errorMessage: String
}

type Query {
  # Counter
  count: Count
}

type Mutation {
  # Increase counter value, returns current counter amount
  addCount(
    # Amount to add to counter
    amount: Int!
  ): Count
}

type Subscription {
  # Subscription fired when anyone increases counter
  countUpdated(ids: String): Count
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`];


const rootResolvers = {
  Query: {
    count(root, args, context) {
      return context.counterService.getCount();
    },
  },
  Mutation: {
    addCount(root, { amount }, context) {
      if (context.user.roles.indexOf('admin') > -1) {
        return context.counterService.addCount(amount)
          .then(() => context.counterService.getCount())
          .then((count) => {
            pubsub.publish('countUpdated', count);
            return count;
          });
      } else {
        return context.counterService.getCount()
          .then((count) => {
            return {
              ...count,
              errorMessage: 'you cannot update the count',
            };
          });
      }
    },
  },
  Subscription: {
    countUpdated(amount) {
      return amount;
    },
  },
};


// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

addErrorLoggingToSchema(executableSchema, { log: e => console.log(e) });

export default executableSchema;
