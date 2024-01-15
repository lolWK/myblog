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

interface Book {
  id: string;
  title: string;
}

interface Topic {
  id: string;
  name: string;
}

type PostType = 'blog' | 'note';
