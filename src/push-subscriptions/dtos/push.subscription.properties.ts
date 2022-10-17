export const pushSubscriptionProperties = {
  id: {
    description: 'The subscription id',
    example: 'some-subscription-id',
  },
  endpoint: {
    description: 'The client endpoint of the subscription.',
    example: 'some-long-endpoint-id',
  },
  expirationTime: {
    description:
      'When the subscription will expire. Null means it will never expire.',
    example: null,
  },
  keys: {
    description: 'The keys object. Includes the public VAPID key.',
  },
};
