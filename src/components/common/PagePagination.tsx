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
  allPostCount: number;
  currentPageNum: number;
  href: string;
};

export default function PagePagination({
  allPostCount,
  currentPageNum,
  href,
}: PaginationProps) {
  const POSTS_PER_PAGE = 8;
  const PAGE_GROUP_SIZE = 3;

  const totalPages = Math.ceil(allPostCount / POSTS_PER_PAGE);
  const totalGroups = Math.ceil(totalPages / PAGE_GROUP_SIZE);

  const groupStartPage =
    currentPageNum - ((currentPageNum - 1) % PAGE_GROUP_SIZE);
  const groupEndPage = Math.min(
    groupStartPage + PAGE_GROUP_SIZE - 1,
    totalPages
  );
  const currentGroupIndex = Math.ceil(currentPageNum / PAGE_GROUP_SIZE);
  const isLastGroup = currentGroupIndex === totalGroups;

  const prevPageNum = (currentGroupIndex - 1) * 3;
  const nextPageNum = currentGroupIndex * 3 + 1;
  const showNextArrow = !isLastGroup;

  // const url = pageType ==="archive" ?`/archive` :

  return (
    <Pagination className='mt-16'>
      <PaginationContent className='flex justify-center'>
        {currentPageNum > 3 && (
          <>
            <PaginationPrevious
              href={`${href}${prevPageNum}`}
              className='font-p text-px14-400'
            />

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {Array.from(
          { length: groupEndPage - groupStartPage + 1 },
          (_, i) => groupStartPage + i
        ).map((pageNum) => (
          <PaginationLink
            key={pageNum}
            href={`${href}${pageNum}`}
            isActive={currentPageNum === pageNum}
          >
            {pageNum}
          </PaginationLink>
        ))}

        {showNextArrow && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationNext
              href={`${href}${nextPageNum}`}
              className='font-p text-px14-400'
            />
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
