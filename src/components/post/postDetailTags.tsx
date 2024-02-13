import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type PostTagsProps = {
  tags: Tag[] | null;
};

export default function PostDetailTags({ tags }: PostTagsProps) {
  console.log(tags);
  if (!tags || tags.length === 0) return <></>;

  return (
    <ul className='flex flex-wrap gap-2 pb-8'>
      {tags.map(
        (tag) =>
          tag && (
            <li key={tag.id} className='cursor-pointer'>
              <Link href={`/search?tag=${tag.name}`}>
                <Badge variant='secondary'># {tag.name}</Badge>
              </Link>
            </li>
          )
      )}
    </ul>
  );
}
