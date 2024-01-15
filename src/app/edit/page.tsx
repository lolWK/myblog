import { fetchBooks, fetchTopics } from '@/queries/post';
import EditForm from '@/components/EditForm';

export const revalidate = 0;

export default async function EditPage() {
  const bookList = await fetchBooks();
  const topicList = await fetchTopics();

  return (
    <>
      <EditForm bookList={bookList} topicList={topicList} />
    </>
  );
}
