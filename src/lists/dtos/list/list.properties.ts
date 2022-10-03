export const listProperties = {
  id: {
    description: 'The unique id of the list.',
    example: 'some-unique-id',
  },
  displayName: {
    description: 'The name of the list.',
    example: 'My awesome list',
    minLength: 1,
    maxLength: 30,
  },
  iconName: {
    description:
      'The icon of the list. Valid icons can be found here: https://fontawesome.com/start',
    default: 'list',
    minLength: 1,
    maxLength: 30,
  },
  hasAmounts: { description: 'Whether the list has amounts.', default: false },
  owner: {
    description: 'Who owns the list.',
    example: { id: 'some-user-id', displayName: 'User' },
  },
  ownerId: {
    description: 'Who owns the list.',
    example: 'some-user-id',
    minLength: 36,
    maxLength: 36,
  },
  members: {
    description: 'Who has access to the list.',
    example: [
      { id: 'some-user-id', displayName: 'User' },
      { id: 'some-other-user-id', displayName: 'Other User' },
    ],
  },
  memberIds: {
    description:
      'Who has access to the list. Does not need to include the owner.',
    example: ['some-user-id', 'some-other-user-id'],
    type: [String],
    minLength: 36,
    maxLength: 36,
  },
  entries: {
    description: 'The entries that belong to this list.',
    example: [
      { id: 'some-entry-id', text: 'Bananas', amount: 4, isChecked: false },
    ],
  },
};
