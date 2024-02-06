import { fetchTopics } from '@/queries/topic';
import { fetchBooks } from '@/queries/book';
import EditForm from '@/components/EditForm';
import { fetchEditPostDetail } from '@/queries/post';

export const revalidate = 0;

type PostEditPageProps = {
  params: {
    postId: string;
  };
};

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { postId } = params;
  console.log(postId);

  const { id, content, ...formValues } = await fetchEditPostDetail(postId);
  const bookList = await fetchBooks();
  const topicList = await fetchTopics();

  return (
    <>
      <EditForm
        bookList={bookList}
        topicList={topicList}
        postId={postId}
        initialContentValue={content}
        initialFormValues={formValues}
      />
    </>
  );
}
