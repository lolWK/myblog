type PostType = 'blog' | 'note';

type Post = {
  id: string;
  title: string;
  postType: string;
  summary: string | null;
  topic: string;
  book: string | null;
  createdAt: string;
  updatedAt: string;
};

type PostDetail = {
  id: string;
  title: string;
  postType: string;
  summary: string | null;
  topic: string;
  book: string | null;
  createdAt: string;
  updatedAt: string;
  content: TElement[];
  prevPost: PrevAndNextPost;
  nextPost: PrevAndNextPost;
};

type PostsWithCount = {
  posts: Post[];
  postsCount: number;
};

type Book = {
  id: string;
  title: string;
};

type Topic = {
  id: string;
  name: string;
};

type PrevAndNextPost = {
  id: string;
  title: string;
} | null;
