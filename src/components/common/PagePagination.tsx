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
  pageType: PostType;
};

export default function PagePagination({
  allPostCount,
  currentPageNum,
  pageType,
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

  return (
    <Pagination className='mt-16'>
      <PaginationContent className='flex justify-center'>
        {currentPageNum > 3 && (
          <>
            <PaginationPrevious
              href={`/${pageType}/page/${prevPageNum}`}
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
            href={`/${pageType}/page/${pageNum}`}
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
              href={`/${pageType}/page/${nextPageNum}`}
              className='font-p text-px14-400'
            />
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
