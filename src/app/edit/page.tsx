import { fetchTopics } from '@/queries/topic';
import { fetchBooks } from '@/queries/book';
import EditForm from '@/components/EditForm';

export default async function EditPage() {
  const bookList = await fetchBooks();
  const topicList = await fetchTopics();

  return (
    <>
      <EditForm bookList={bookList} topicList={topicList} />
    </>
  );
}
