import supabase from '@/lib/supabase';

import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';

export const revalidate = 0;

export const fetchPosts = async (type: PostType, page = 0): Promise<Post[]> => {
  const itemsPerPage = 10;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  const { data, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      summary,
      created_at,
      updated_at,
      post_type(name),
      topic(name),
      book(title)
      `
    )
    .ilike('post_type.name', type) // 이거 왜 .eq 가 안되는건지.. ilike
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (error) throw new Error(error.message);
  console.log(data);
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

export const fetchPostDetail = async (
  postId: string,
  type: PostType
): Promise<fetchPostDetail> => {
  const { data: post, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      summary,
      created_at,
      updated_at,
      topic(name),
      post_type(name),
      book(title),
      content
      `
    )
    .eq('id', postId)
    .eq('post_type.name', type)
    .single();

  if (error) throw new Error(error.message);

  const { data: prevPost } = await supabase
    .from('post')
    .select('id, title')
    .lt('created_at', post.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const { data: nextPost } = await supabase
    .from('post')
    .select('id, title')
    .gt('created_at', post.created_at)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  console.log(post);
  console.log(prevPost);
  console.log(nextPost);

  return {
    id: post.id,
    title: post.title,
    summary: post.summary,
    topic: post.topic ? post.topic.name : '',
    book: post.book ? post.book.title : null,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    content: post.content,
    prevPost: prevPost ? { id: prevPost.id, title: prevPost.title } : null,
    nextPost: nextPost ? { id: nextPost.id, title: nextPost.title } : null,
  };
};

export const fetchPostCountByType = async (type: PostType): Promise<number> => {
  // count만 head쓰면 데이터들은 안불러옴!
  const { data, error, count } = await supabase
    .from('post')
    .select(`post_type!inner(name)`, { count: 'exact', head: true })
    .eq('post_type.name', type);

  if (error) throw new Error(error.message);

  return count ?? 0;
};

export const fetchBooks = async () => {
  const { data: book, error } = await supabase.from('book').select('*');

  if (error) throw new Error(error.message);

  return book;
};

export const fetchTopics = async () => {
  const { data: topic, error } = await supabase.from('topic').select('*');

  if (error) throw new Error(error.message);

  return topic;
};

export const getPostTypeId = async (postType: PostType) => {
  const { data, error } = await supabase
    .from('post_type')
    .select('id')
    .eq('name', postType)
    .single();

  if (error) throw new Error(error.message);

  return data.id;
};
