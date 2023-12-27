import { Input } from '@/components/ui/input';
import SearchIcon from '@/assets/icons/icon-search.svg';

export default function SearchInput() {
  return (
    <form className="relative">
      <label
        htmlFor="search"
        className="colors-foreground cursor-pointer absolute top-[50%] -translate-y-2/4 right-3"
      >
        <SearchIcon width={16} height={16} stroke="currentColor" />
        <span className="sr-only">검색</span>
      </label>
      <Input
        type="text"
        className="absolute -top-[20px] right-0 bg-transparent w-0 focus:w-[160px] border-none focus:outline-none transition-width duration-300 pr-8"
        id="search"
        autoComplete="off"
      />
    </form>
  );
}
