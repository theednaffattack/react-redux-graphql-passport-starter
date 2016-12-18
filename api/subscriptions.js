import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

const pubsub = new PubSub();

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    countUpdated: () => ({
      countUpdated: {
        filter(count) {
          // This is a silly example of how the subscription filter works.
          // Clients will not see updates when the counter hits 13.
          // A more meaningful example can be found at
          // https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb#4af9
          const shouldit = count.amount !== 13;
          return shouldit;
        },
      },
    }),
  },
});

export { subscriptionManager, pubsub };
