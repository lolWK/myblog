import supabase from '@/lib/supabase';

export const fetchBooks = async () => {
  const { data: book, error } = await supabase.from('book').select('*');

  if (error) throw new Error(error.message);

  return book;
};

export const fetchAllBookListWithCount = async () => {
  const { data, error } = await supabase.from('book').select(`
    id,
    title,
    post!inner(id, book_id)
  `);

  if (error) throw new Error(error.message);

  return (
    data.map((item) => ({
      id: item.id,
      text: item.title,
      count: item.post?.length || 0,
    })) || []
  );
};

export const fetchListOfBookSeries = async (postId: string) => {
  const { data: bookId } = await supabase
    .from('post')
    .select('book_id')
    .eq('id', postId)
    .single();

  if (!bookId || !bookId.book_id) return null;

  const { data: listOfBookSeries, error } = await supabase
    .from('post')
    .select('id,title')
    .eq('book_id', bookId.book_id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return listOfBookSeries;
};
