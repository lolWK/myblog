import type { Database } from '@/types/supabaseDB';
import supabase from '@/lib/supabase';
import { cache } from 'react';

import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import type { TElement } from '@udecode/plate-common';
import { fetchTagsForPost } from './tag';
export const revalidate = 0;

type PostTag = Database['public']['Tables']['tag']['Row'];
type PostTagWithoutCreatedAt = Omit<PostTag, 'created_at'>;

export const fetchPostIds = async () => {
  const { data: postIds } = await supabase.from('post').select('id');

  if (!postIds) return [];

  return postIds;
};

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

export const fetchPostDetail = async (postId: string): Promise<PostDetail> => {
  console.log('Fetching data for post ID:', postId);

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
    .single();

  if (error) throw new Error(error.message);

  const tagsPromise = fetchTagsForPost(postId);

  const prevPostPromise = supabase
    .from('post')
    .select('id, title, post_type!inner(name)')
    .lt('created_at', post.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const nextPostPromise = supabase
    .from('post')
    .select('id, title, post_type!inner(name)')
    .gt('created_at', post.created_at)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  const [tags, { data: prevPost }, { data: nextPost }] = await Promise.all([
    tagsPromise,
    prevPostPromise,
    nextPostPromise,
  ]);

  return {
    id: post.id,
    postType: post.post_type!.name,
    title: post.title,
    summary: post.summary,
    topic: post.topic ? post.topic.name : '',
    book: post.book ? post.book.title : null,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    content: post.content as TElement[],
    tag: tags,
    prevPost: prevPost ? { id: prevPost.id, title: prevPost.title } : null,
    nextPost: nextPost ? { id: nextPost.id, title: nextPost.title } : null,
  };
};

export const getPostDetail = cache(fetchPostDetail);

type PostDetailInitialValue = {
  id: string;
  postType: string;
  title: string;
  summary: string | undefined;
  topic: string | undefined;
  book: string | undefined;
  content: TElement[];
  tag: string | undefined;
};

export const fetchEditPostDetail = async (
  postId: string
): Promise<PostDetailInitialValue> => {
  console.log(postId);

  const { data: post, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      summary,
      topic(id),
      post_type(name),
      book(id),
      content
      `
    )
    .eq('id', postId)
    .single();

  let tagsText: string | undefined;

  const tags = (await fetchTagsForPost(postId)) as Tag[];

  if (!tags) {
    tagsText = undefined;
  } else {
    tagsText = tags.map((tag) => tag?.name).join(',');
  }
  // const tagNames = tagsArray.join(',');

  // return tagNames

  if (error) throw new Error(error.message);

  return {
    id: post.id,
    postType: post.post_type ? post.post_type.name : 'blog',
    title: post.title,
    summary: post.summary ? post.summary : undefined,
    topic: post.topic ? post.topic.id : undefined,
    book: post.book ? post.book.id : undefined,
    content: post.content as TElement[],
    tag: tagsText,
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

export const fetchSearchPostByTagName = async (tag: string) => {
  const { data: tagData, error: tagError } = await supabase
    .from('tag')
    .select('id')
    .eq('name', tag);

  if (tagError) {
    console.error('Error fetching tag:', tagError);
    return [];
  }
  console.log(tagData, 'tagDatatagDatatagData');

  const tagIds = tagData.map((t) => t.id);
  const { data: postTagData, error: postTagError } = await supabase
    .from('post_tag')
    .select('post_id')
    .in('tag_id', tagIds);

  if (postTagError) {
    console.error('Error fetching post_tag:', postTagError);
    return [];
  }

  const postIds = postTagData.map((pt) => pt.post_id);
  const { data: postData, error: postError } = await supabase
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
    .in('id', postIds);

  if (postError) {
    console.error('Error fetching posts:', postError);
    return [];
  }

  return postData.map((post) => ({
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
