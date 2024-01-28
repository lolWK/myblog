import supabase from '@/lib/supabase';

import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import type { PostgrestResponse } from '@supabase/supabase-js';

export const revalidate = 0;

export const fetchPosts = async (type: PostType, page = 1): Promise<Post[]> => {
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
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
      post_type!inner(name),
      topic(name),
      book(title)
      `
    )
    .eq('post_type.name', type) // 이거 왜 .eq 가 안되는건지.. ilike
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

export const getPostTypeId = async (postType: PostType) => {
  const { data, error } = await supabase
    .from('post_type')
    .select('id')
    .eq('name', postType)
    .single();

  if (error) throw new Error(error.message);

  return data.id;
};

// TODO. 그냥 fetchPost랑 합치는거 고민해보기.
export const fetchSearchResult = async (query: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      summary,
      created_at,
      updated_at,
      post_type!inner(name),
      topic(name),
      book(title)
      `
    )
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

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

export const fetchPostFilteredByTopicAndBook = async (
  filter: string,
  tag: string,
  page: number = 1
): Promise<PostsWithCount> => {
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  console.log(filter, tag, page);

  let filteredPosts = supabase
    .from('post')
    .select(
      `
    id,
    title,
    summary,
    created_at,
    updated_at,
    post_type!inner(name),
    topic!inner(name),
    book(title)
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (filter === 'book' && tag) {
    filteredPosts = filteredPosts.not('book', 'is', null).eq('book.title', tag);
  }

  if (filter === 'topic' && tag) {
    filteredPosts = filteredPosts.eq('topic.name', tag);
  }

  const { data, error, count } = await filteredPosts;

  console.log(data);

  if (error) throw new Error(error.message);

  const posts = data.map((post) => ({
    id: post.id,
    title: post.title,
    postType: post.post_type ? post.post_type.name : '',
    summary: post.summary,
    topic: post.topic ? post.topic.name : '',
    book: post.book ? post.book.title : null,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  }));

  const postsCount = count ?? 0;

  return { posts, postsCount };
};
