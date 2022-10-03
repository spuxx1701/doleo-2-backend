export const listEntryProperties = {
  id: {
    description: 'The unique id of the list entry.',
    example: 'some-unique-id',
  },
  text: {
    description: 'The text of the list entry.',
    example: 'ToDo: Create some new lists!',
    minLength: 1,
    maxLength: 255,
  },
  amount: {
    description: 'The amount of the list entry.',
    default: 1,
  },
  isChecked: {
    description: 'Whether the list entry is currently checked.',
    default: false,
  },
  list: {
    description: 'The list this list entry belongs to.',
    example: { id: 'some-list-id', displayName: 'Shopping' },
  },
  listId: {
    description: 'The list this list entry belongs to.',
    example: 'some-list-id',
    minLength: 36,
    maxLength: 36,
  },
};
