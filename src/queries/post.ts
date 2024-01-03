import supabase from '@/lib/supabase';

import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';

type PostType = 'blog' | 'note';

export const fetchPosts = async (type: PostType, page = 0): Promise<Post[]> => {
  const itemsPerPage = 10;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  console.log('Making a query');

  const { data, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      summary,
      created_at,
      updated_at,
      post_type!inner(
        name
      ),
      topic(
        name
      ),
      book(
        title
      )
    `
    )
    .eq('post_type.name', type)
    .range(startIndex, endIndex);

  if (error) throw new Error(error.message);

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    postType: post.post_type ? post.post_type.name : '',
    summary: post.summary,
    topic: post.topic ? post.topic.name : '',
    book: post.book ? post.book.title : null,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  }));
};
