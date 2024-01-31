interface Post {
  id: string;
  title: string;
  postType: string;
  summary: string | null;
  topic: string;
  book: string | null;
  createdAt: string;
  updatedAt: string;
}

type PostsWithCount = {
  posts: Post[];
  postsCount: number;
};

type fetchPostDetail = {
  id: string;
  title: string;
  postType: string;
  summary: string | null;
  topic: string;
  book: string | null;
  createdAt: string;
  updatedAt: string;
  content: Json;
  prevPost: PrevAndNextPost;
  nextPost: PrevAndNextPost;
};

interface Book {
  id: string;
  title: string;
}

interface Topic {
  id: string;
  name: string;
}

type PostType = 'blog' | 'note';

type PrevAndNextPost = {
  id: string;
  title: string;
} | null;
