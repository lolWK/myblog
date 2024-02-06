export const getArchiveListHeader = (
  filter: 'topic' | 'book',
  keyword: string
) => {
  return filter === 'topic'
    ? `주제 - ${keyword}`
    : filter === 'book'
      ? `책장 - ${keyword}`
      : 'All';
};
