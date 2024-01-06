import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  // 필요한 props 타입 추가
  // href: string;
} & React.ComponentProps<typeof Link>;

export default function PagePagination() {
  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationPrevious href='#' className='font-p text-px14-400' />

        <PaginationLink>1</PaginationLink>
        <PaginationLink>2</PaginationLink>
        <PaginationLink>3</PaginationLink>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationNext href='#' className='font-p text-px14-400' />
      </PaginationContent>
    </Pagination>
  );
}
